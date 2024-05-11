class AddInformationToProfile < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :first_phone, :string
    add_column :profiles, :second_phone, :string
    add_column :profiles, :about_me, :text
    add_column :profiles, :telegram_link, :string
    add_column :profiles, :instagram_link, :string
    add_column :profiles, :facebook_link, :string
    add_column :profiles, :first_name, :string
    add_column :profiles, :second_name, :string
  end
end
