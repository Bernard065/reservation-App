class Admin::UsersController < ApplicationController
    before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    def index
      @users = User.all
      render json: @users, status: :ok
    end
    
    def show
      @user = User.find(params[:id])
      render json: @user, status: :ok
    end
    
    def destroy
      @user = User.find(params[:id])
      @user.destroy
      head :no_content
    end

    private 

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end


    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found 
    end
end
  