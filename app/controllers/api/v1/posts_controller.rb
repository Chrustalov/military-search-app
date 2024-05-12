class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ], except: %i[ index ]
  
  def index
    if params[:title].blank? && params[:cities].blank?
      @posts = Post.all
    else
      @posts = Posts::FilterService.call(Post.all, params)
    end

    @cities = City.where(id: params[:cities])

    post_data_with_city = []

    @posts.each do |post|
      post_attributes = post.attributes.symbolize_keys

      tag_names = post.city
      post_attributes[:city] = tag_names
      post_attributes[:photo] = post.photo.url

      post_data_with_city << post_attributes
    end

    render json: { posts: post_data_with_city, cities: @cities, all_cities: City.all.pluck(:name)}
  end

  def show
    @post = Post.find(params[:id])
    latest_posts = Post.order(created_at: :desc).limit(3)
  
    comments_with_emails = @post.comments.map { |comment| { 
      id: comment.id,
      text: comment.text,
      email: comment.user.email # Отримати email користувача коментаря
    } }
  
    render json: {
      post: @post,
      comments: comments_with_emails, # Використовуємо коментарі з email користувачів
      city: @post.city,
      missing_people: @post.missing_people,
      creator: @post.user,
      creator_profile: @post.user.profile,
      latest_posts: latest_posts
    }
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      params[:missing_people].each do |person_params|
        @post.missing_people.create(missing_person_params(person_params))
      end

      users_to_mail.each do |user| 
        VolunteerMailer.with(user: user,post: @post).job_email.deliver_later
      end
        render json: {post: @post,missing_person: @post.missing_people}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      users_to_mail.each do |user| 
        VolunteerMailer.with(user: user,post: @post).job_email.deliver_later
      end
      render json: {post: @post,missing_person: @post.missing_person}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def upload_table_data
    render json: { 'status' => 'ok', missing_people => [] }
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :status, :content,  :city_id,:photo)
  end

  def users_to_mail 
    # Користувачі, для яких broadcast.only_my_city === false та city == @city
    users_false_city = User.joins(:broadcast).where(broadcasts: { only_my_city: false }).joins(:profile)
    
    # Користувачі, для яких broadcast.only_my_city == true та city == @city
    users_true_city = User.joins(:broadcast).where(broadcasts: { only_my_city: true }).joins(:profile).where(profiles: { city_id: @post.city_id })
  
    # Об'єднання результатів запитів за допомогою методу or
    users = users_false_city.or(users_true_city)
    users = users.joins(:broadcast).where(broadcasts: { is_email: true })
    
    users
  end
  
  
  
  

  def missing_person_params(person_params)
    person_params.permit(:first_name, :last_name, :avatar, :birthdate, :region, :information)
  end
end
