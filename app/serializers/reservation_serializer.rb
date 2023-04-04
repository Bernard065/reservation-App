class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :num_guests, :created_at, :user_id, :room_id
  has_one :user
  has_one :room
end
