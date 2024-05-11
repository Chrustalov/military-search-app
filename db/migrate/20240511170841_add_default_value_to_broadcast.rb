class AddDefaultValueToBroadcast < ActiveRecord::Migration[7.0]
  def change
    change_column_default :broadcasts, :is_telegram, from: nil, to: false
    change_column_default :broadcasts, :is_email, from: nil, to: false

    change_column_default :broadcasts, :only_my_city, from: nil, to: false


  end
end
