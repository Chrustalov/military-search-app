class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]
  def index
    @posts = @posts.all

    post_data = []

    @posts.each do |post|
      post_attributes = post.attributes.symbolize_keys      
      post_attributes.missing_person = post.missing_person
      post_data << post_attributes
    end
    render json: {posts: post_data}
  end

  def show 
    render json: {post: @post, missing_person: @post.missing_person, creator: @post.user}
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      person = MissingPerson.new(missing_person_params)
      person.post_id = @post.id
      if person.save() 
        render json: {post: @post,missing_person: @post.missing_person}
      end
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
    params.require(:post).permit(:title, :status, :content, :profile)
  end

  def missing_person_params
    params.require(:missing_person).permit(:first_name, :last_name, :avatar, :birthdate, :city_id, :region, :information)
  end
end
