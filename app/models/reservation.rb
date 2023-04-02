class Reservation < ApplicationRecord
    belongs_to :user
    belongs_to :room
  
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :num_guests, presence: true
    validate :end_date_after_start_date
    validate :no_conflicting_reservations
  
    private
  
    def end_date_after_start_date
      return if end_date.blank? || start_date.blank?
      errors.add(:end_date, 'must be after start date') if end_date < start_date
    end
  
    def no_conflicting_reservations
      if room.reservations.exists?(
        "start_date <= ? AND end_date >= ?",
        end_date, start_date
      )
        errors.add(:base, "This room is not available during the selected dates")
      end
    end
end
  