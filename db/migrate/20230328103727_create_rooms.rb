class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :title
      t.text :description
      t.integer :num_guests
      t.integer :num_beds
      t.integer :num_baths
      t.integer :price
      t.boolean :self_check_in
      t.boolean :wifi
      t.boolean :tv
      t.boolean :bathroom_essentials
      t.boolean :bedroom_comforts
      t.boolean :coffee_maker
      t.boolean :hair_dryer
      t.string :location
      t.text :location_description
      t.string :img_url
      t.boolean :booked

      t.timestamps
    end
  end
end
