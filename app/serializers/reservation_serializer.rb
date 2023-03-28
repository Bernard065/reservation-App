class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :num_guests
  has_one :user
  has_one :room
end
