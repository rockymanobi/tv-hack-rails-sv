class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :uuid, null: false
      t.string :name, null: false
      t.string :photo_base64, limit: 20000 
      t.timestamps
    end
  end
end
