class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ], except: %i[ index ]
  
  def index
    @posts = Post.all
    render json: { posts: @posts }
  end

  def show
    latest_posts = Post.order(created_at: :desc).limit(3)

    render json: {
      post: @post,
      missing_people: @post.missing_people,
      creator: @post.user,
      creator_profile: @post.user.profile,
      latest_posts:
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
        VolunteerMailer.with(user: user,post: @post).job_email.deliver_now
      end
      render json: {post: @post,missing_person: @post.missing_person}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
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
