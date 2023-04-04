class RoomsController < ApplicationController
  before_action :authorize_admin, only: [:create, :update, :destroy]
  
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    @rooms = Room.all
    render json: @rooms, status: :ok
  end

  def show
    @room = find_room
    render json: @room, status: :ok
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      render json: @room, status: :created
    else
      render json: { errors: @room.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @room = find_room
    if @room.update(room_params)
      render json: @room, status: :ok
    else
      render json: { error: @room.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @room = find_room
    @room.destroy
    head :no_content
  end

  private

  def room_params
    params.permit(:name, :category, :price, :size, :capacity, :breakfast, :featured, :description, :extras, :img_url)
  end

  def find_room
    Room.find(params[:id])
  end

  def render_not_found_response
    render json: { error: "Room not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize_admin
    unless session[:user_id] && User.find(session[:user_id]).admin?
      render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
    end
  end
end
