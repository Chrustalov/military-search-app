class Api::V1::PostsController < ApplicationController
    def index 
        @cities = City.all
        render json: {cities: @cities}
    end
end  