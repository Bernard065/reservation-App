class ReservationsController < ApplicationController
    before_action :authorize

    def index
        @reservations = Reservation.all
        render json: @reservations, status: :ok
    end

    def show
        @reservation = find_reservation
        render json: @reservation, status: :ok
    end

    private

    def find_reservation
        Reservation.find(params[:id])
    end
end
