class CreateMissingPeople < ActiveRecord::Migration[7.0]
  def change
    create_table :missing_people do |t|
      t.string :first_name
      t.string :last_name
      t.string :avatar
      t.date :birthdate
      t.references :city, null: false, foreign_key: true
      t.string :region
      t.text :information

      t.timestamps
    end
  end
end
