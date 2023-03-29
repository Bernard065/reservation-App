class Review < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :content, presence: true
  validates_uniqueness_of :user_id, scope: [:room_id]
end
