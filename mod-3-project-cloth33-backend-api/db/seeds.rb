# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



user_1 = User.create(username: "Molly")
user_2 = User.create(username: "Taryn")
user_3 = User.create(username: "Mitch")
user_4 = User.create(username: "Ralleigh")
user_5 = User.create(username: "Willow")
user_6 = User.create(username: "Lou")

item_1 = Item.create(name: "Blue Shirt", category: "Shirt", img_url: 'https://m.media-amazon.com/images/I/71soGD-jw0L._SR500,500_.jpg', user_id: 1)
item_2 = Item.create(name: "Black Shirt", category: "Shirt", img_url: 'https://shirtsofcotton.com/en/media/catalog/product/cache/10/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/s/h/shirtsofcotton-t-shirt-soc-10-front-1200px_1.jpg', user_id: 1)
item_3 = Item.create(name: "Jeans", category: "Pants", img_url: 'https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dwa114bdae/product_images/0860445380252NEW_00_349.jpg?sw=690&sh=1070&sm=fit', user_id: 1)
item_4 = Item.create(name: "Blue Shorts", category: "Pants", img_url: 'https://assets.adidas.com/images/w_385,h_385,f_auto,q_auto:sensitive,fl_lossy/ecf1733c290d42e9a81ca833017c0b2f_9366/ultimate365-shorts.jpg', user_id: 1)
item_5 = Item.create(name: "Belt", category: "Accessory", img_url: 'https://cdn-images.farfetch-contents.com/12/13/24/61/12132461_10136995_600.jpg', user_id: 1)

outfit_1 = Outfit.create(user_id: 1)

outfitItem_1 = OutfitItem.create(item_id: 1, outfit_id: 1)
outfitItem_2 = OutfitItem.create(item_id: 3, outfit_id: 1)
outfitItem_3 = OutfitItem.create(item_id: 5, outfit_id: 1)