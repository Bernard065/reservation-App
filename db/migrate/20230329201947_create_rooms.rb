class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :category
      t.integer :price
      t.integer :size
      t.integer :capacity
      t.boolean :breakfast
      t.boolean :featured
      t.text :description
      t.text :extras
      t.string :img_url

      t.timestamps
    end
  end
end
