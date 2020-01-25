require 'sinatra/base'
require 'json'

class BookmarkManager < Sinatra::Base

  enable :sessions

  get '/' do
    File.read(File.join('public', 'interfaceJ.html'))
  end

  post '/temperature' do
    session[:temp] = params[:temp].to_i
    JSON.generate({temp: session[:temp]})
  end

  get '/temperature' do
    JSON.generate({temp: session[:temp] || 20})
  end

  run! if app_file == $0
end