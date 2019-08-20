const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'flex'
const itemForm = document.getElementById('item-form')
const closetDiv = document.getElementById('item-container')
// DOMContentLoaded
let userId = 1


document.addEventListener('DOMContentLoaded' , ()=>{
    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit' , (event) =>{
        event.preventDefault();
        loginUser(loginForm.username.value);
        hideElement(loginForm , false)
        addNewItem()
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
    }).then(user=>{
        console.log(user)
        userId = user['id']
        console.log(userId)
        renderNewItems(user.items)
    })
}

// load closet / clothes manager to ADD , VIEW , and , DELETE CLOTHES
const renderNewItems = (items) => {
    // console.log(items)
    for(const item of items){
        createItemElements(item)    
    }    
}

const createItemElements = (item) => {
    let itemDiv = document.createElement('div')
    let itemNameH3 = document.createElement('h4')
        itemNameH3.innerText = item.name
    let itemImage = document.createElement('img')
        itemImage.className = 'item-avatar'
        itemImage.src = item.img_url
    let deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'X'

    itemDiv.append(itemNameH3, itemImage, deleteButton)
    closetDiv.append(itemDiv)

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
        .then(item => {
            createItemElements(item)
            console.log(item)
        })
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

