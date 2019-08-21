class Item < ApplicationRecord
  belongs_to :user
  has_many :outfit_items, dependent: :destroy
  has_many :outfits , through: :outfit_items
  validates_associated :user

  def self.categories
    ['top' , 'bottom' , 'accessory'  , 'shoes', 'dress']
  end

  def self.clothing_types
    ['shirt' , 'blouse' , 'tank-top' , 'pants' , 'skirt' , 'shoes']
  end
end
