class AddOrgNameToProfile < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :organization_name, :string
  end
end
