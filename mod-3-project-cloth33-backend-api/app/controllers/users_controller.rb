class UsersController < ApplicationController
    
    def index

        user = User.find_by(username: params[:username])
        render json: user, include:[:items, :outfits]
        # users = User.all
        # #render json: users , include:[:items , :outfits]
        # render json: users.to_json(include: {
        #     items: {except: [:created_at , :updated_at]} ,
        #     outfits: {except: [:created_at , :updated_at] , include: {
        #         items: {except: [:created_at , :updated_at]}
        #     }}
        # },
        # except: [:created_at , :updated_at])
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

        6.times do
            outfit = Outfit.new(user_id: user.id)
            temp = []
            3.times do
                new_item = user.items.shuffle[0]
                temp << new_item
            end
            puts '====================================='
            puts temp
            temp = temp.uniq
            temp.each do |item|
                outfit.items << item
            end

            outfit.save
        end

        render json: user.to_json(include: {
            items: {except: [:created_at , :updated_at]} ,
            outfits: {except: [:created_at , :updated_at] , include: {
                items: {except: [:created_at , :updated_at]}
            }}
        },
        except: [:created_at , :updated_at])
    end 

    def show 
        #user = User.find_by(username: params[:username])
        user = User.find_by(id: params[:id])
        #render json: user, include: [:items]
        render json: user.to_json(include: {
            items: {except: [:created_at , :updated_at]} ,
            outfits: {except: [:created_at , :updated_at] , include: {
                items: {except: [:created_at , :updated_at]}
            }}
        },
        except: [:created_at , :updated_at])

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
