class CreateFurefures < ActiveRecord::Migration
  def change
    create_table :furefures do |t|
      t.references :channel, index: true
      t.references :user, index: true
      t.integer :at_time_sec

      t.timestamps
    end
  end
end
