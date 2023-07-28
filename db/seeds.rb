# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "🦸‍♀️ Seeding..."

# Create 10 users
10.times do |n|
  User.create(
    username: Faker::Internet.unique.username,
    email: Faker::Internet.unique.email,
    password: 'password',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    admin: n < 3 
  )
end

# Define specific hotel room image URLs
room_image_urls = [
  'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1605346576608-92f1346b67d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1594130139005-3f0c0f0e7c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  'https://images.unsplash.com/photo-1631048730670-ff5cd0d08f15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGhvdGVsJTIwcm9vbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
  
]


# Create 10 rooms
room_image_index = 0
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
    img_url: room_image_urls[room_image_index % room_image_urls.length]
  )
  room_image_index += 1
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