class UsersController < ApplicationController
    before_action :authorize_user, except: [:create]

    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
    def index
      @users = User.all
      render json: @users, status: :ok
    end
  
    def show
      @user = User.find_by(id: session[:user_id])
      if @user
          render json: @user
      else
          render json: { error: "Not authorized" }, status: :unauthorized
      end
    end
  
    def create
      @user = User.new(user_params)
      if @user.save!
        session[:user_id] = @user.id
        render json: @user, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      @user = User.find(session[:user_id])
      if @user.update!(user_params)
        render json: @user
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
  
    def authorize_user
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
  
    def user_params
      params.permit(:username, :email, :password, :password_confirmation, :first_name, :last_name, :admin)
    end
  
    def render_record_not_found_response
      render json: { error: "Record not found" }, status: :not_found
    end
end
  