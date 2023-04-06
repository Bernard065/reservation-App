Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :reservations, only: [:index, :show, :create, :update, :destroy]
  resources :reviews, only: [:index, :create]
  resources :rooms

  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"
  get '/admin/reservations', to: 'reservations#admin_index'
  delete "/admin/delete_reservation", to: "reservations#delete_reservation"


  

  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
