class User < ApplicationRecord
    has_many :reservations, dependent: :destroy
    has_many :rooms, through: :reservations, dependent: :destroy

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :last_name, presence: true
    validates :first_name, presence: true
end
