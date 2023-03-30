class Room < ApplicationRecord
    has_many :reservations, dependent: :destroy
    has_many :users, through: :reservations, dependent: :destroy

    validates :name, presence: true
    validates :category, presence: true
    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :size, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :capacity, presence: true, numericality: { greater_than_or_equal_to: 0 }

end
