class ReservationsController < ApplicationController
    before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        @reservations = Reservation.includes(:room).where(user_id: session[:user_id]).order(created_at: :desc)
        render json: @reservations, include: :room, status: :ok
    end

    def all_reservations
        @reservations = Reservation.all
        render json: @reservations, status: :ok
    end
      

    def show
        @reservation = Reservation.includes(:room).where(user_id: session[:user_id], id: params[:id]).first
        if @reservation
          render json: @reservation, include: :room, status: :ok
        else
          render json: { error: "Reservation not found" }, status: :not_found
        end
    end
      

    def create
        @reservation = Reservation.new(reservation_params)
        @reservation.user_id = session[:user_id]
        if @reservation.save!
            render json: @reservation, status: :created
        else
            render json: @reservation.errors, status: :unprocessable_entity
        end
    end

    def update
        @reservation = Reservation.where(user_id: session[:user_id], id: params[:id]).first
        if @reservation.update!(reservation_params)
          render json: @reservation, status: :ok
        else
            render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
    end
      

    def destroy
        @reservation = Reservation.where(user_id: session[:user_id]).find(params[:id])
        @reservation.destroy
        head :no_content
    end


    private

    def reservation_params
        params.permit(:start_date, :end_date, :num_guests, :room_id)
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
