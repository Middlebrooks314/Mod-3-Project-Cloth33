const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'flex'
const itemForm = document.getElementById('item-form')
const closetDiv = document.getElementById('item-container')
const mainPageContent = document.getElementById('main-page-content')
// DOMContentLoaded
let userId = 1


document.addEventListener('DOMContentLoaded' , ()=>{
    const newUserForm = document.getElementById('new-user-form')
    newUserForm.addEventListener('submit' , (event) =>{
        event.preventDefault();
        createUser(newUserForm.username.value);
        hideElement(newUserForm, false)
        addNewItem()
    })


    document.getElementById('clothes').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createClothesViewer();
    })

    document.getElementById('outfits').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createOutfitViewer();
    })
    document.getElementById('outfit-creator').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createOutfitCreator();
    })

})

const createUser = (name) =>{
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

    deleteButton.addEventListener("click", event =>{
        fetch(`${hostURL}items/${item.id}`, {
            method: "DELETE"
        }).then(event.target.parentNode.remove())
    })
        itemDiv.append(itemNameH3, itemImage, deleteButton)
        closetDiv.append(itemDiv)

}


const addNewItem = () => {
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


// clears out the main-page-content div
function unrenderMPC(){
    while(mainPageContent.firstChild)
        mainPageContent.removeChild(mainPageContent.firstChild)
}

function createOutfitCreator(){
    let viewPanel = document.createElement('div')
    viewPanel.className = 'card'
    mainPageContent.appendChild(viewPanel)
}

function createOutfitViewer(){
    let viewPanel = document.createElement('div')
    viewPanel.className = 'card'
    mainPageContent.appendChild(viewPanel)

    let userId = 1  // change this to the user_id of the logged-in user

    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp =>{
        return resp.json();
    }).then(json =>{
        // this loop will get the individual outfit from the object
        for(let i = 0; i < json['outfits'].length; i++){
            let outfitElements = json['outfits'][i]['items']
            console.log(outfitElements)

            // create the holder div for the outfit
            let holder = document.createElement('div')
            holder.className = 'card m-3 w-50'

            let subDiv = document.createElement('div')
            subDiv.className = 'row p-3'
            holder.appendChild(subDiv)
            mainPageContent.appendChild(holder)

            // this loop does things with the outfit element that we get from the first loop
            for(let j = 0; j < outfitElements.length; j++){
                //console.log(outfitElements[j])

                let img = document.createElement('img')
                img.src= outfitElements[j]['img_url']
                img.className = 'col border rounded m-0 p-0'
                subDiv.appendChild(img)
            }

            holder.appendChild(document.createElement('hr'))
            let deleteButton = document.createElement('button')
            deleteButton.innerHTML = 'Delete!'
            deleteButton.className = 'col text-center btn btn-primary'

            let titleDiv = document.createElement('div')
            titleDiv.className = 'row mb-3 mt-1 mx-5'
            titleDiv.appendChild(deleteButton)

            holder.appendChild(titleDiv)
        }
    })
}

