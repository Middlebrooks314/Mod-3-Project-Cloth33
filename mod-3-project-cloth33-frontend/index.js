const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'block'
// DOMContentLoaded

document.addEventListener('DOMContentLoaded' , ()=>{
    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit' , (e) =>{
        e.preventDefault();
        hideElement(loginForm , false)
        loadClosetManager()
    })
})
// DOMContentLoaded End

function hideElement(htmlElement , makeVisible){
    if(makeVisible)
        htmlElement.style.display = defaultElementStyle
    else
        htmlElement.style.display = 'none'
}



// load closet / clothes manager to ADD , VIEW , and , DELETE CLOTHES
function loadClosetManager(){

}

//load the outfit-creation screen to USE EXISTING CLOTHES
function loadOutfitCreator(){

}

// view outfits
function outfitView(){

}

function loginUser(username){
    fetch(hostURL , {
        method: 'POST' ,
        headers:{
            'Content-Type' : 'application/json' , 
            'Accept' : 'application/json'
        } , 
        body: JSON.stringify({
            'username' : username
        })
    }).then(resp =>{
        return resp.json();
    }).then(json =>{
        console.log(json)
    })
}