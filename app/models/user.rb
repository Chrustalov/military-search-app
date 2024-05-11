class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
   :recoverable, :validatable,
   :jwt_authenticatable, jwt_revocation_strategy: self
  has_one :profile, dependent: :destroy
  has_many :posts
  enum role: { user: 0, moderator: 1 }
end
