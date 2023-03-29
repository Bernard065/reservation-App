class User < ApplicationRecord
    has_many :reservations
    has_many :rooms, through: :reservations

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :last_name, presence: true
    validates :first_name, presence: true
end
