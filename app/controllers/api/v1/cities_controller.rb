class Api::V1::CitiesController < ApplicationController
    def index 
        @cities = City.all
        render json: {cities: @cities}
    end
end  
