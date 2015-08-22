require 'sinatra' unless defined?(Sinatra)
require "sequel"
require "sinatra/config_file"
config_file "#{settings.root}/config.yml"

configure do
  # load models
  $LOAD_PATH.unshift("#{settings.root}/lib")
  Dir.glob("#{settings.root}/lib/*.rb") { |lib| require File.basename(lib, '.*') }

end
configure do
  DB = Sequel.connect settings.database
end
