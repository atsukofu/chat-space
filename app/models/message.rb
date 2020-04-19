class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  validates :content, presence: true, unless: :image?
  validates :user, presence: true 
  validates :group, presence: true

  mount_uploader :image, ImageUploader
end
