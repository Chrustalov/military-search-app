Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }, controllers: {
     sessions: 'users/sessions',
     registrations: 'users/registrations'
   }

  namespace :api do
    namespace :v1 do
      resources :posts do
        collection do
          post '/upload_table_data', to: 'api/v1/posts#upload_table_data'
        end
      end
      resources :cities
      resources :comments
      namespace :volunteer do 
        resources :profiles
      end
      namespace :organization do 
        resources :profiles
      end
    end
  end
end
