require "sinatra"
require File.join(settings.root, "environment")
require File.join(settings.root, "models/feed")
require File.join(settings.root, "models/article")
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
get '/feeds' do 
  feeds = Feed.all
  a = feeds.first
  a.link
end
get '/articles' do
  articles = Article.all
  a = articles.first
  a.summary
end
