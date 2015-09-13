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
    articles = @ds.paginate(page_num, 10)
    ss = articles.map { |e| e.values }
    ss
  end
	def add_feed(url)
		return 'url must start with http://' unless url.start_with? "http://"
		Feed.create(link:url)
		Feed.all
	end
  def initialize
    @ds = Article.dataset
    @ds.extension! :pagination
  end
end
