class ChangeBirthdateToStringInMissingPeople < ActiveRecord::Migration[7.0]
  def change
    change_column :missing_people, :birthdate, :string
  end
end
