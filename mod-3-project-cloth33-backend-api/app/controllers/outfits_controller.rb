class OutfitsController < ApplicationController
    def index
        outfits = Outfit.all
        #render json: outfits , include: [:items] , except: [:created_at]
        render json: outfits.to_json(
            include: { user: {only: [:username]} , items: {except: [:created_at , :updated_at]}, },
             except: [:created_at , :updated_at])
    end

    def create
        # NOTE: the 'items' param must be in the form of an array when passed in on the front-end
        outfit = Outfit.create(user_id: params[:user_id])

        params[:items].each do |item|
            current_item = Item.where(id: item[:id])
            outfit.items << current_item
        end
        
        outfit.save
        render json: outfit, include: [:items]
    end 
    
    def destroy 
        Outfit.find_by(id: params[:id]).destroy
        render json: "Outfit Deleted!"
    end 

    def show
        outfit = Outfit.find_by(id: params[:id])
        #render json: outfit , include:[:items] , except:[:created_at]
        render json: outfit.to_json(
            include: { user: {only: [:username]} , items: {except: [:created_at , :updated_at]}, },
             except: [:created_at , :updated_at])
    end 
end

