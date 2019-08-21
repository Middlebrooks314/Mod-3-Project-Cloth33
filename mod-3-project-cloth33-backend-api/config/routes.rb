Rails.application.routes.draw do
  resources :outfit_items
  resources :outfits
  resources :items
  resources :users
  get 'login/:username', action: :login, controller: 'users'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
