class Post < ApplicationRecord
  mount_uploader :photo, AvatarUploader
  belongs_to :user
  has_many :missing_people
  belongs_to :city
  enum status: { in_process: 0, found: 1 }
end
