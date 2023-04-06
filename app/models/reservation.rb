class Reservation < ApplicationRecord
    belongs_to :user
    belongs_to :room
  
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :num_guests, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validate :end_date_after_start_date
    validate :no_conflicting_reservations
  
    private
  
    def end_date_after_start_date
      return if end_date.blank? || start_date.blank?
      errors.add(:end_date, 'must be after start date') if end_date < start_date
    end
  
    def no_conflicting_reservations
      if Reservation.where(room_id: room_id)
                     .where("start_date < ?", end_date)
                     .where("end_date > ?", start_date)
                     .where.not(id: id)
                     .exists?
        errors.add(:room_id, "conflicts with an existing reservation")
      end
    end
end
  