class AddDefaultStatusToPosts < ActiveRecord::Migration[7.0]
  def change
    change_column_default :posts, :status, 0
  end
end
