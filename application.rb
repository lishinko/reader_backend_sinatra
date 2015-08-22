require "sinatra"
require File.join(File.dirname(__FILE__), "environment")

configure do
  set :show_exceptions, :after_handler
end

configure :production, :development do
  enable :logging
end

helpers do
  # add your helpers here
end

# root page
get "/" do
  redirect '/index.html'
end
