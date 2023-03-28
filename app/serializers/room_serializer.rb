class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :num_guests, :num_beds, :num_baths, :price, :self_check_in, :wifi, :tv, :bathroom_essentials, :bedroom_comforts, :coffee_maker, :hair_dryer, :location, :location_description, :img_url, :booked
end
