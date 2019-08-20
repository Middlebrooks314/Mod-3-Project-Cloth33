const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'block'
const itemForm = document.getElementById('item-form')
// DOMContentLoaded

document.addEventListener('DOMContentLoaded' , ()=>{
    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit' , (e) =>{
        e.preventDefault();
        hideElement(loginForm , false)
        loadClosetManager()
        addNewItem()
    })
})
let userId = 1
function addNewItem() {
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let formData = {
            name: itemForm.name.value,
            category: itemForm.category.value,
            img_url: itemForm.img.value,
            user_id: userId
        }
        fetch(hostURL + 'items', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(console.log)
    })
}
// console.log(itemForm)
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
    fetch(hostURL + '/users', {
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