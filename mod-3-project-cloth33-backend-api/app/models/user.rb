class User < ApplicationRecord
    has_many :outfits
    has_many :items
end
