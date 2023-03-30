class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :num_guests, presence: true

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?
    errors.add(:end_date, 'must be after start date') if end_date < start_date
  end
  
end
