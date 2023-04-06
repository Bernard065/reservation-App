class ReservationsController < ApplicationController
    before_action :authorize
    before_action :authorize_admin, only: [:admin_index]
  
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
    def index
      @reservations = Reservation.where(user_id: session[:user_id]).includes(:room).order(created_at: :desc)
      render json: @reservations, include: :room, status: :ok
    end
  
    def admin_index
      @reservations = Reservation.includes(:user, :room).order(created_at: :desc)
      render json: @reservations, include: [:user, :room], status: :ok
    end
  
    def show
      @reservation = Reservation.where(user_id: session[:user_id], id: params[:id]).includes(:room).first
      if @reservation
        render json: @reservation, include: :room, status: :ok
      else
        render json: { error: "Reservation not found" }, status: :not_found
      end
    end
  
    def create
      # Check if the room is available within the range of start_date and end_date
      reservations = Reservation.where(room_id: params[:room_id]).where("(start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?) OR (start_date >= ? AND end_date <= ?)", params[:start_date], params[:start_date], params[:end_date], params[:end_date], params[:start_date], params[:end_date])
      if reservations.present?
        render json: { error: "The room is already booked during that period" }, status: :unprocessable_entity
        return
      end
    
      # Create the reservation if the room is available
      @reservation = Reservation.new(reservation_params.merge(user_id: session[:user_id]))
      if @reservation.save
        render json: @reservation, status: :created
      else
        render json: @reservation.errors, status: :unprocessable_entity
      end
    end
    
  
    def update
      @reservation = Reservation.where(user_id: session[:user_id], id: params[:id]).first
      if @reservation.update(reservation_params)
        render json: @reservation, status: :ok
      else
        render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @reservation = Reservation.where(user_id: session[:user_id], id: params[:id]).first
      if @reservation
        @reservation.destroy
        head :no_content
      else
        render json: { error: "Reservation not found" }, status: :not_found
      end
    end

    def delete_reservation
      @reservation = Reservation.find(params[:id])
      @reservation.destroy
      head :no_content
    end
  
    private
  
    def reservation_params
      params.permit(:start_date, :end_date, :num_guests, :room_id)
    end
  
    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session[:user_id]
    end
  
    def authorize_admin
      return render json: { error: "Not authorized" }, status: :unauthorized unless User.find(session[:user_id]).admin?
    end
  
    def render_not_found_response
      render json: { error: "Reservation not found" }, status: :not_found
    end
  
    def render_unprocessable_entity_response(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
  