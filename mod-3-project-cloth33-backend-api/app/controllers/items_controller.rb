class ItemsController < ApplicationController


    def create 
        item = Item.create(item_params)
    end
    
    def destroy
        Item.find_by(id: params[:id]).destroy
    end

    private 
    
    def item_params 
        params.require(:item).permit(:name, :url, :category, :user_id)
    end 

end
