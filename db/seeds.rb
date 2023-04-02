# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "🦸‍♀️ Seeding powers..."

# Create 10 users
10.times do
  User.create(
    username: Faker::Internet.unique.username,
    email: Faker::Internet.unique.email,
    password: 'password',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end


# Create 10 rooms
10.times do
  Room.create(
    name: "Room #{rand(100)}",
    category: ['Single', 'Double', 'Triple', 'Quad'].sample,
    price: rand(50..200),
    size: rand(20..50),
    capacity: rand(1..4),
    breakfast: [true, false].sample,
    featured: [true, false].sample,
    description: "This is a description of Room #{rand(100)}.",
    extras: ['Wi-Fi', 'TV', 'Mini-bar', 'Balcony', 'Air conditioning'].sample(3).join(', '),
    img_url: "https://picsum.photos/300/200?random=#{rand(100)}"
  )
end




# Create 10 reviews
10.times do
  Review.create(
    rating: rand(1..5),
    content: Faker::Lorem.paragraph,
    user_id: User.pluck(:id).sample,
    room_id: Room.pluck(:id).sample
  )
end


puts "🦸‍♀️ Done seeding!"  