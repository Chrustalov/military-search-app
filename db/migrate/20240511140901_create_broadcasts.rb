class CreateBroadcasts < ActiveRecord::Migration[7.0]
  def change
    create_table :broadcasts do |t|
      t.boolean :is_telegram
      t.boolean :is_email
      t.boolean :only_my_city
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
