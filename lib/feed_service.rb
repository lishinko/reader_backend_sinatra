require "sequel"
require File.join(settings.root, "models/article")
class FeedService
  def refresh
  	
  end
  def get_articles(page_num = 0)
    articles = Article.all
	s = articles.map { |e| e.values }
	s
  end
end