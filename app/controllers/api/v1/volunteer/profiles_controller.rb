class Api::V1::Volunteer::ProfilesController < ApplicationController
    before_action :set_user, only: %i[ show  ]
    before_action :set_profile, only: %i[  update destroy ]
    def show 
        render json: { user: @user, profile: @user.profile}
    end
    def update 
        if current_user && @profile.update(profile_params) 
            render json: { user: current_user, profile: @profile}
          else
            render json: @request.errors, status: :unprocessable_entity
          end
    end
    def index
        if current_user.present?
        render json: current_user
        else
            render json: "Not Authorized", status: :unprocessable_entity
        end
    end
    private 
    def set_user
        @user = User.find(params[:id])
    end

    def set_profile
        @profile = Profile.find(params[:id])
    end
    def profile_params
        params.require(:profile).permit(:first_name, :second_name, :about_me,:first_phone,
        :second_phone, :city_id, :telegram_link, :avatar, :facebook_link )
    end
end