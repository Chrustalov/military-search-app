
class Posts::FilterService < BaseService
  attr_accessor :scope, :params

  def initialize(scope, params)
    @scope = scope
    @params = params
  end

  def call
    posts = params[:title].present? ? select_post_by_title : []

    return posts if params[:cities].blank?

    filter_by_cities(posts)
  end

  private

  def filter_by_cities(posts = nil)

    posts_filtered = posts.present? ? posts : @scope
    return posts_filtered if params[:cities].nil? || params[:cities].empty?
    posts_filtered.joins(:city)
                  .where(cities: { name: params[:cities] })
                  .distinct
  end

  def select_post_by_title
    Post.where("title ILIKE ?", "%#{params[:title]}%")
  end
end
