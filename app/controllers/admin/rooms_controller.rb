# app/controllers/admin/rooms_controller.rb
class Admin::RoomsController < ApplicationController
    before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
    def index
      @rooms = Room.all
      render json: @rooms
    end
  
    def show
      @room = find_room
      render json: @room
    end
  
    def create
      @room = Room.new(room_params)
  
      if @room.save!
        render json: @room, status: :created
      else
        render json: { errors: @room.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      @room = find_room
  
      if @room.update!(room_params)
        render json: @room, status: :ok
      else
        render json: @room.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @room = Room.find_room
      @room.destroy
    end
  
    private

    def find_room
        Room.find(params[:id])
    end
  
    def room_params
      params.permit(:name, :category, :price, :size, :capacity, :breakfast, :featured, :description, :extras, :img_url)
    end
  
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end


    def render_not_found_response
        render json: { error: "Room not found" }, status: :not_found 
     end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
  