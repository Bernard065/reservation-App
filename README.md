# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# reservation-App


## User Stories

As a user, I can sign up for an account with a unique username and email, and create a password to access my account.

As a user, I can view a list of available rooms that are listed by other users on the website.

As a user, I can search for a specific room based on its location, number of guests it accommodates, and other amenities.

As a user, I can book a reservation for a specific room for a certain date range, and receive confirmation of my booking.

As a user, I can view a list of all of my past and upcoming reservations, and cancel a reservation if necessary.

As a user, I can leave a review of a room that I have stayed in, including a rating and written feedback.

As a administator, I can create a listing for my room with details such as the number of guests it can accommodate etc

As a admin, I can manage my listing by updating information, setting availability, and accepting or declining reservation requests.

As an administrator, I can manage the user database, including the ability to delete users or listings if necessary.

## Installation
Clone the repository to your local machine: use the git clone command

Install Ruby dependencies using Bundler: bundle install

Install the frontend dependencies using npm install --prefix client

Then run foreman start -f Procfile.dev to start the application, the rails application(backend) will open on port 3000 while the frontend application will open on port 4000
