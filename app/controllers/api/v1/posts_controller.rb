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
        render json: {post: @post,missing_person: @post.missing_people}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
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
    params.require(:post).permit(:title, :status, :content, :photo)
  end


  def missing_person_params(person_params)
    person_params.permit(:first_name, :last_name, :avatar, :birthdate, :city_id, :region, :information)
  end
end
