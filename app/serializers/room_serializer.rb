class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :price, :size, :capacity, :breakfast, :featured, :description, :extras, :img_url
end
