class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  before_action :allow_all

  def allow_all
    headers['Access-Control-Allow-Origin'] = "*"
  end
end
