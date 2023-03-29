class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    def show
        @user = User.find_by(id: session[:user_id])
        if @user
            render json: @user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def create
        @user = User.create!(user_params)
        if @user.valid?
            session[:user_id] = @user.id
            render json: @user, status: :created
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @user = User.find(params[:id])
        @user.update!(user_params)
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :first_name, :last_name)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
