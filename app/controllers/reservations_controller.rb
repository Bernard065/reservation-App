class ReservationsController < ApplicationController
    before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        if session[:user_id]
            @reservations = Reservation.all
            render json: @reservations, status: :ok
        else
            render json: { errors: "You are not logged in" }, status: :unauthorized
        end
    end

    def show
        if session[:user_id]
            @reservation = find_reservation
            render json: @reservation, status: :ok
        else
            render json: { error: "You are not logged in" }, status: :unauthorized
        end
    end

    def create
        if session[:user_id]
            @user = User.find(session[:user_id])
            @reservation = @user.reservations.new(reservation_params)
            if @reservation.valid?
                @reservation.save!
                render json: @reservation, status: :created
            else
                render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: "You are not logged in" },
            status: :unauthorized
        end
    end

    def update
        @reservation = find_reservation
        if @reservation.update!(reservation_params)
            render json: @reservation, status: :ok
        else
            render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @reservation = find_reservation
        @reservation.destroy
        head :no_content
    end


    private

    def reservation_params
        params.permit(:start_date, :end_date, :num_guests, :room_id)
    end

    def find_reservation
        Reservation.find(params[:id])
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

    def render_not_found_response
        render json: { error: "Reservation not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
