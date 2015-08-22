require "json"
require "sequel"
class Article < Sequel::Model
  def to_json
    {
      title: self.title,
      summary: self.summary
    }.to_json
  end
end
