class UsersController < ApplicationController
    


    def create
        user = User.create(user_params)
        render json: user
    end 
        

    def show 
        user = User.find_by(id: params[:id])
        render json: user, only: [:username], include: [:items]
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
