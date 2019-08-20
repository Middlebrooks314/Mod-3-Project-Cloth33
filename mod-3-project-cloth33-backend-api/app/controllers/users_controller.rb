class UsersController < ApplicationController
    
    def index
        users = User.all
        render json: users , include:[:items]
    end

    def create
        user = User.create(user_params)
        render json: user
    end 

    def show 
        user = User.find_by(username: params[:username])
        render json: user, include: [:items]
    end 

    def destroy
        User.find_by(id: params[:id]).destroy
        render json: "User Deleted!"
    end

    private 

    def user_params 
        #params.require(:user).permit(:username)
        params.require(:user).permit(:username)
    end 

end
