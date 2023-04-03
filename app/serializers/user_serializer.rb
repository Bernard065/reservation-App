class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :first_name, :last_name, :admin

  has_many :reservations
end
