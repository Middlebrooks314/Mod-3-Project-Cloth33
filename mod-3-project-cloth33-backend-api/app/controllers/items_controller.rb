class ItemsController < ApplicationController

    def index 
        items = Item.all 
        render json: items, include: [:user]
    end 

    def create 
        item = Item.create(item_params)
        render json: item
    end
    
    def destroy
        Item.find_by(id: params[:id]).destroy
        render json: "Item Deleted"
    end

    private 
    
    def item_params 
        params.require(:item).permit(:name, :img_url, :category, :user_id)
    end 

end
