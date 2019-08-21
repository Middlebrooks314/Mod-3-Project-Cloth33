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
        item = Item.new(item_params)
        
        if item.save 
            render json: item.to_json(include: {user: {except: [:created_at , :updated_at]} } ,except: [:created_at , :updated_at])
        else
            render json: {error: "Your closet is at it's 33 item limit, please remove an item before adding new ones"}
        end 
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
