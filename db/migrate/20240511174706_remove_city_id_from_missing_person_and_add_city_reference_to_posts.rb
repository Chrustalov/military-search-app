class RemoveCityIdFromMissingPersonAndAddCityReferenceToPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :missing_people, :city_id, :integer
    add_reference :posts, :city, foreign_key: true
  end
end
