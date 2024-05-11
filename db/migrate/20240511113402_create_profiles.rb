class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.references :city, foreign_key: true

      t.string :first_phone
      t.string :second_phone
      t.text :about_me
      t.string :telegram_link
      t.string :instagram_link
      t.string :facebook_link
      t.string :first_name
      t.string :second_name
      t.string :avatar

      t.timestamps
    end
  end
end
