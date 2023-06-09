class SessionsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
    def create
      @user = User.find_by(username: params[:username])
      if @user&.authenticate(params[:password])
        session[:user_id] = @user.id
        render json: @user, status: :created
      else
        render json: { errors: "Invalid username or password" }, status: :unauthorized
      end
    end
  
    def destroy
      if current_user
        session.delete :user_id
        head :no_content
      else
        render json: { errors: "You are not logged in" }, status: :unauthorized
      end
    end
  
    private
  
    def render_not_found_response
      render json: { error: "User not found" }, status: :not_found 
    end
  
    def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    def current_user
      @current_user ||= User.find_by(id: session[:user_id])
    end
  
    def require_login
      unless current_user
        render json: { errors: "You must be logged in" }, status: :unauthorized
      end
    end
  
end
  