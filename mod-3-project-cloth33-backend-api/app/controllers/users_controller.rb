class UsersController < ApplicationController
    
    def index
        users = User.all
        #render json: users , include:[:items , :outfits]
        render json: users.to_json(include: {
            items: {except: [:created_at , :updated_at]} ,
            outfits: {except: [:created_at , :updated_at] , include: {
                items: {except: [:created_at , :updated_at]}
            }}
        },
        except: [:created_at , :updated_at])
    end

    def create
        user = User.create(user_params)
        # random-generated clothing
        30.times do |new_item|
            new_url = "https://picsum.photos/id/#{rand(1..1000)}/200/300"

            new_item = Item.new(user_id: user.id , category: Item.categories.shuffle[0] , img_url: new_url , name: 'Name!')
            new_item.name = "#{Faker::Company.name} #{Item.clothing_types.shuffle[0]}"
            new_item.save
        end
        render json: user, include: [:items]
    end 

    def show 
        user = User.find(params[:id])
        render json: user, include: [:items]
    end 

    def destroy
        User.find_by(id: params[:id]).destroy
        render json: "User Deleted!"
    end

    private
    def user_params 
        params.require(:user).permit(:username)
    end 

end
