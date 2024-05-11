class Post < ApplicationRecord
  belongs_to :user
  has_one :missing_person

  enum status: { in_process: 0, found: 1 }
end
