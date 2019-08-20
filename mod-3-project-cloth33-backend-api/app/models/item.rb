class Item < ApplicationRecord
  belongs_to :user
  has_many :outfit_items
  has_many :outfits , through: :outfit_items

  def self.categories
    ['top' , 'bottom' , 'accessory'  , 'shoes']
  end

  def self.clothing_types
    ['shirt' , 'blouse' , 'tank-top' , 'pants' , 'skirt' , 'shoes']
  end
end
