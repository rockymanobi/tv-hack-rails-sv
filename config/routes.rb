Rails.application.routes.draw do
  resources :furefures do
    collection do
      get 'index_for_tv'
    end
  end

  resources :users

  resources :channels

  resources :tests

end
