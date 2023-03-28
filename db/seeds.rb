# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


puts "🦸‍♀️ Seeding powers..."
# create users
10.times do
  User.create!(
    username: Faker::Internet.username(specifier: 5..8),
    email: Faker::Internet.email,
    password_digest: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end

# create rooms
10.times do
  Room.create!(
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph(sentence_count: 2),
    num_guests: rand(1..4),
    num_beds: rand(1..3),
    num_baths: rand(1..2),
    price: rand(50..200),
    self_check_in: Faker::Boolean.boolean,
    wifi: Faker::Boolean.boolean,
    tv: Faker::Boolean.boolean,
    bathroom_essentials: Faker::Boolean.boolean,
    bedroom_comforts: Faker::Boolean.boolean,
    coffee_maker: Faker::Boolean.boolean,
    hair_dryer: Faker::Boolean.boolean,
    location: Faker::Address.city,
    location_description: Faker::Lorem.sentence(word_count: 6),
    img_url: Faker::LoremFlickr.image(size: "600x400"),
    booked: false
  )
end

# create reservations
10.times do
  start_date = Faker::Date.between(from: Date.today, to: 1.year.from_now)
  end_date = Faker::Date.between(from: start_date + 1.day, to: start_date + 1.week)

  Reservation.create!(
    start_date: start_date,
    end_date: end_date,
    num_guests: rand(1..4),
    user_id: User.pluck(:id).sample,
    room_id: Room.pluck(:id).sample
  )
end

# create reviews
10.times do
  Review.create!(
    rating: rand(1..5),
    content: Faker::Lorem.paragraph(sentence_count: 3),
    user_id: User.pluck(:id).sample,
    room_id: Room.pluck(:id).sample
  )
end

puts "🦸‍♀️ Done seeding!"