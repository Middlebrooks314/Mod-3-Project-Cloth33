class Item < ApplicationRecord
  belongs_to :user_id
  has_many :outfit_items
  has_many :outfits , through: :outfit_items
end
