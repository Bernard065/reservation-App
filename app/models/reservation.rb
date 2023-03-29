class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :num_guests, presence: true
  
  validate :end_date_is_after_start_date
  validate :num_guests_within_capacity

  def end_date_is_after_start_date
    errors.add(:end_date, "must be after start date") if start_date && end_date < start_date
  end

  def num_guests_within_capacity
    if room && num_guests && num_guests > room.num_guests_within_capacity
      errors.add(:num_guests, "exceeds room capacity")
  end

end
