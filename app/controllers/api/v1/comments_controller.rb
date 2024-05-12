class Api::V1::CommentsController < ApplicationController

    def create 
        if current_user
            @post = Post.find(params[:post_id])
            @comment = @post.comments.build({text: params[:text], user_id: current_user.id})
            if @comment.save() 
                render json: {comment: @comment}
            else 
                render json: @comment.errors, status: :unprocessable_entity
            end
        else 
            render json: @comment.errors, status: :unprocessable_entity
        end
      
    end
end  