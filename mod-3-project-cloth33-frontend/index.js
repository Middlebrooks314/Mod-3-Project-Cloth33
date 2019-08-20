const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'flex'
const itemForm = document.getElementById('item-form')
// DOMContentLoaded
let userId = 1


document.addEventListener('DOMContentLoaded' , ()=>{
    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit' , (e) =>{
        e.preventDefault();
        loginUser(loginForm.username.value);
        hideElement(loginForm , false)
        
    })
})

function loginUser(name){
    fetch(hostURL + 'users', {
        method: 'POST' ,
        headers:{
            'Content-Type' : 'application/json' , 
            'Accept' : 'application/json'
        } , 
        body: JSON.stringify({
            user: { username : name }
        })
    }).then(resp =>{
        return resp.json();
    }).then(json =>{
        console.log(json)
        userId = json['id']
        console.log(userId)
        fetchUserItems(userId)
    })
}

// load closet / clothes manager to ADD , VIEW , and , DELETE CLOTHES
const fetchUserItems = (userId) => {
    fetch(`${hostURL}users/${userId}`)
        .then(resp => resp.json())
        .then(console.log)
        // renderNewItem()
}

const renderNewItem = () => {
    // let itemDiv = document.createElement('div')
    // let itemNameH3 = document.createElement('H3')
    // let itemImage = document.createdElement('img')
    //     itemImage.src = 

}


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

function hideElement(htmlElement , makeVisible){
    if(makeVisible)
        htmlElement.style.display = defaultElementStyle
    else
        htmlElement.style.display = 'none'
}






//load the outfit-creation screen to USE EXISTING CLOTHES
function loadOutfitCreator(){

}

// view outfits
function outfitView(){

}

