require 'sinatra/base'
require 'sinatra/config_file'

require "./environment"
require './models/feed'
require './lib/feed_service'
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
class App < Sinatra::Base
  register Sinatra::ConfigFile
  get "/" do
    redirect '/index.html'
  end
  get '/feeds' do
    feeds = Feed.all
    s = feeds.map{|e| e.link}
    s.to_json
  end

	post '/feeds/new' do
		request.body.rewind
		data = JSON.parse request.body.read
		"hello #{data["link"]}"
	end
	delete '/feeds/:id' do
	end

 get '/articles/:page' do
    #s = FeedService.new
    page = params[:page].to_i
    page = page > 0 ? page : 1
    hash = @s.get_articles(page)
    hash.to_json
  end
  get '/refresh' do
    #s = FeedService.new
    @s.refresh
    'ok'
  end
	def initialize
		super
		@s = FeedService.new
	end
end
