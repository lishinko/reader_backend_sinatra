require "sequel"
require "feedjira"
require File.join(settings.root, "models/article")
require File.join(settings.root, "models/feed")
class FeedService
  def refresh
  	feeds = Feed.all
  	feeds.each do |e|
	  feed = Feedjira::Feed.fetch_and_parse e.link
	  feed.entries.each { |article| 
      Article.create title: article.title, summary: article.summary
	  }
    end	
  end
  def get_articles(page_num = 0)
   @ds.paginate(page_num, 10)
   articles = @ds.all
	ss = articles.map { |e| e.values }
	ss
  end
  def initialize
    @ds = Article.dataset
    @ds.extension! :pagination
  end
end
