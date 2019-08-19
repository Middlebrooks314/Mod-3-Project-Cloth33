class OutfitsController < ApplicationController
    def index
        outfits = Outfit.all
        render json: outfits , include: [:items] , except: [:created_at]
    end

    def create
        outfit = Outfit.create(user_id: params[:user_id], items: params[:items])
        render json: outfit, include: [:items]
    end 
    
    def destroy 
        Outfit.find_by(id: params[:id]).destroy
        render json: "Outfit Deleted!"
    end 

    def show
        outfit = Outfit.find_by(id: params[:id])
        render json: outfit , include:[:items] , except:[:created_at]
    end



    
end

