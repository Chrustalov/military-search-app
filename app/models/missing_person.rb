class MissingPerson < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  belongs_to :city
end
