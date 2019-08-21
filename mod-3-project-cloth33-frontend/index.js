const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'flex'
const itemForm = document.getElementById('item-form')
//const closetDiv = document.getElementById('item-container')
const mainPageContent = document.getElementById('main-page-content')
// DOMContentLoaded
let userId = 1
const loginForm = document.getElementById('login-form')
const newUserForm = document.getElementById('new-user-form')
const nameInput = document.getElementById('log-input')


    document.addEventListener('DOMContentLoaded' , ()=>{
    newUserForm.addEventListener('submit' , (event) =>{
        event.preventDefault();
        createUser(newUserForm.username.value);
        hideElement(newUserForm, false)
        
        // get the clothing screen to render here with a new fetch request
    })

    loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
        // loginUser(event.username.value)
        // console.log(nameInput.value)
        loginUser(nameInput.value)
    })

    const loginUser = (username) => {
            fetch(`${hostURL}login/${username}`)
            .then(resp => resp.json())
            .then(userInfo => {
                renderNewItems(userInfo.items)
                console.log(userInfo.items)
                
        })
    }

    document.getElementById('clothes').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createClothesViewer(1);
        console.log('Cloth Viewer')

    })

    document.getElementById('outfits').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createOutfitViewer(1);
        // console.log('outfit viewer')
    })
    document.getElementById('outfit-creator').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createOutfitCreator();
        // console.log('outfit creator')
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
        userId = user['id']
        // console.log(userId)
    })
}




// load closet / clothes manager to ADD , VIEW , and , DELETE CLOTHES
const renderNewItems = (items) => {
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
        //closetDiv.append(itemDiv)
        mainPageContent.append(itemDiv)

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
            // console.log(item)
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
    while(mainPageContent.firstChild){
        mainPageContent.removeChild(mainPageContent.firstChild)
    }
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
            // console.log(outfitElements)


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



// input the user-id for it to be added into the link
// this function will only be called when the user is logged in, due to the button-action
function createClothesViewer(myUserId){
    // this renders clothes
    fetch(`${hostURL}users/${myUserId}`)
    .then(resp =>{
        return resp.json();
    }).then(json =>{
        //console.log(json)
        //console.log(json['items'][0]['img_url'])
        userId = myUserId
        // console.log(userId)
        renderNewItems(json.items)
    })

}



function createOutfitCreator(myUserId=1){

    // create the clothing-creator div
    let outfitDiv = document.createElement('div')
    outfitDiv.id = 'outfit-div'
    mainPageContent.appendChild(outfitDiv)

    // create and populate the clothing div
    let clothingDiv = document.createElement('div')
    clothingDiv.id = 'clothing-div'
    clothingDiv.className = 'bg-info p-2'
    mainPageContent.appendChild(clothingDiv)

    let currentOutfit = []

    fetch(`${hostURL}users/${myUserId}`)
    .then(resp =>{
        return resp.json();
    }).then(json =>{
        // console.log(json)
        //console.log(json['items'][0]['img_url'])
        userId = myUserId
        //console.log(userId)

        // create a grid here to fit the clothing cards
        //renderNewItems(json.items)
        json.items.forEach(item =>{
            //console.log(item)

            let itemDiv = document.createElement('div')
            itemDiv.id = item['id']
            itemDiv.className = 'card w-25'
            let itemNameH3 = document.createElement('h4')
                itemNameH3.innerText = item.name
            let itemImage = document.createElement('img')
                itemImage.className = 'item-avatar'
                itemImage.src = item.img_url
        
                itemDiv.append(itemNameH3, itemImage)
                //closetDiv.append(itemDiv)
                clothingDiv.append(itemDiv)

                // event listener to add an item to the outfit
                itemDiv.addEventListener('click' , ()=>{
                    if(itemDiv.parentNode.id == outfitDiv.id){
                        clothingDiv.prepend(itemDiv)
                        
                        for(let i = 0; i < currentOutfit.length; i++){
                            //console.log(item)
                            if(item == currentOutfit[i]){
                                currentOutfit = currentOutfit.splice(i , 1)
                                //console.log('Whop')
                            }
                            
                        }
                        console.log(currentOutfit)
                    }
                    else
                        if(outfitDiv.childNodes.length < 4){
                            outfitDiv.append(itemDiv)
                            currentOutfit.push(item)
                        }
                })
        
        })

        // add save-features to the outfit
        let saveButton = document.createElement('button')
        saveButton.className = 'btn btn-danger'
        saveButton.innerHTML = 'SAVE'
        outfitDiv.appendChild(saveButton)
        saveButton.addEventListener('click' , ()=>{
            console.log(currentOutfit)
            fetch(hostURL + 'outfits' , {
                method: 'POST' , 
                headers: {
                    'Content-Type' : 'application/json' ,
                    'Accept' : 'application/json'
                } ,
                body: JSON.stringify({
                    user_id: 1 ,    // change this to the actual one later
                    items: currentOutfit
                })
            }).then(resp =>{
                return resp.json();
            }).then(json =>{
                console.log(json)
            })
        })
    })


    //unrenderMPC();
    //mainPageContent.appendChild(clothingDiv)
}
