class Profile < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  belongs_to :user
  belongs_to :city, optional: true
end
