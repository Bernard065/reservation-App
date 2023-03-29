Rails.application.routes.draw do
  resources :users
  resources :reservations
  resources :reviews
  resources :rooms

  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout" to: "sessions#destroy"
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
