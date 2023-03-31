Rails.application.routes.draw do
  resources :users, only: [:show, :create, :update]
  resources :reservations, only: [:index, :show, :create, :update, :destroy]
  resources :reviews, only: [:index, :create]
  resources :rooms

  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"
  

  namespace :admin do
    resources :rooms, only: [:index, :create, :show, :update, :destroy]
    resources :users, only: [:index, :show, :destroy]
  end


  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
