require "sequel"
require "feedjira"
require File.join(settings.root, "models/article")
require File.join(settings.root, "models/feed")
class FeedService
  def refresh
  	feeds = Feed.all
	feeds.each { |e| 
	  feed = Feedjira::Feed.fetch_and_parse e.link
	  feed.entries.each { |article| 
		Article.create title: article.title, summary: article.summary
	  }
   	}
  end
  def get_articles(page_num = 0)
    articles = Article.all
	s = articles.map { |e| e.values }
	s
  end
end
