class CreateChannels < ActiveRecord::Migration
  def change
    create_table :channels do |t|
      t.string :uuid, null: false
      t.string :title, null: false
      t.integer :status, default: Channel::STATUS_AVAILABLE
      t.string :source_uri, null: false

      t.timestamps
    end

    add_index :channels, :uuid, unique: true

  end
end
