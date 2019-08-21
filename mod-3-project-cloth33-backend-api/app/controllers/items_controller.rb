class ItemsController < ApplicationController

    def index 
        items = Item.all 
        #render json: items, include: [:user]
        render json: items.to_json(include: {user: {except: [:created_at , :updated_at]} } ,
         except: [:created_at , :updated_at])
    end

    def show
        item = Item.find_by(id: params[:id])
        render json: item.to_json(include: {user: {except: [:created_at , :updated_at]} } ,
         except: [:created_at , :updated_at])
    end


    def create 
        item = Item.create(item_params)
        #render json: item
        render json: item.to_json(include: {user: {except: [:created_at , :updated_at]} } ,
         except: [:created_at , :updated_at])
    end
    
    def destroy
        p params 
        Item.find_by(id: params[:id]).destroy!
        render json: "Item Deleted"
    end

    private 
    
    def item_params 
        params.require(:item).permit(:name, :img_url, :category, :user_id)
    end 

end
