require "sinatra"
require File.join(settings.root, "environment")
require File.join(settings.root, "models/feed")
require File.join(settings.root, "lib/feed_service")
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
  s = FeedService.new
  s.get_articles(0)
end
