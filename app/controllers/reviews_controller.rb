class ReviewsController < ApplicationController
  before_action :authorize

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    @reviews = Review.all
    render json: @reviews, status: :ok
  end

  def create
    @user = User.find(session[:user_id])
    @room = Room.find(params[:room_id])
    @review = @room.reviews.new(review_params.merge(user: @user))
    if @review.valid?
      @review.save!
      render json: @review, status: :created
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.permit(:content, :rating, :user_id, :room_id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def render_not_found_response
    render json: { error: 'Review not found' }, status: :not_found
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
end
