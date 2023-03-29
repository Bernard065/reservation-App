class Room < ApplicationRecord
    has_many :reservations
    has_many :users, through: :reservations

    validates :title, presence: true
    validates :num_guests, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
