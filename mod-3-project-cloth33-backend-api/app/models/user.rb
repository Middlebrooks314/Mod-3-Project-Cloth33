class User < ApplicationRecord
    has_many :outfits, dependent: :destroy
    has_many :items, dependent: :destroy
    validates :username, uniqueness: true
end
