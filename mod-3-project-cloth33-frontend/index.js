const hostURL = 'http://localhost:3000/'
const defaultElementStyle = 'flex'

const navBar = document.getElementById('nav-buttons')
const newClothingDiv = document.getElementById('new-item')
const itemForm = document.getElementById('item-form')
//const closetDiv = document.getElementById('item-container')
const mainPageContent = document.getElementById('main-page-content')
// DOMContentLoaded
let userId = 1
const loginForm = document.getElementById('login-form')
const newUserForm = document.getElementById('new-user-form')
const nameInput = document.getElementById('log-input')
const createButton = document.getElementById('create-button')
const itemAddButton = document.getElementById('item-button')
// Error Span Handlers
const spanErrorLogin = document.getElementById("span-error-login")
const spanErrorItems = document.getElementById("span-error-items")
const itemCounter = document.getElementById('item-counter')

let formOn = false // use this to toggle the form on and off on the toggleForm function

document.addEventListener('DOMContentLoaded' , ()=>{
    hideElement(newClothingDiv , false)
    hideElement(navBar , false)
    newUserForm.addEventListener('submit' , (event) =>{
        event.preventDefault();
        createUser(newUserForm.username.value, newUserForm);

        
        
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
                unrenderMPC();
                makeToggler();
                //mainPageContent.appendChild(newClothingDiv)
                hideElement(newClothingDiv , true)
                //console.dir(userInfo.items)
                renderNewItems(userInfo.items.reverse() , false)
                //console.log(userInfo.items)
                hideElement(navBar , true)
                itemCounter.innerHTML = userInfo['items'].length         
        })
    }

    document.getElementById('clothes').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        
        unrenderMPC();
        //mainPageContent.appendChild(newClothingForm)
        createClothesViewer();
        console.log('Cloth Viewer')

    })

    document.getElementById('outfits').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createOutfitViewer();
        //console.log('outfit viewer')
    })
    document.getElementById('outfit-creator').addEventListener('click' , ()=>{
        // check for the user-id, make sure it is there before going through these events
        unrenderMPC();
        createOutfitCreator();
        // console.log('outfit creator')
    })

})

const createUser = (name, newUserForm) =>{
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
        // console.log(resp)
        return resp.json();

    }).then(user=>{
        // this is being passed as a global variable
        if (user.error) {
            //  username already exists
            console.error(user.error)
            createUserErrorHandler(user.error)
        }else {
            // user successfully created 
            userId = user['id']
            console.log(user)
            hideElement(newUserForm, false)
        }
    })
}

const createUserErrorHandler = (error) => {
    spanErrorLogin.innerText = error
    // createButton.after(errorSpan)
}

// load closet / clothes manager to ADD , VIEW , and , DELETE CLOTHES
const renderNewItems = (items , prependItems , parentElement=null) => {
    for(const item of items){
        createItemElements(item , prependItems , parentElement)    
    }    
}

// appends after a specific element if called as an arg
const createItemElements = (item , prependItem=false , parentElement=null , appendAfter=false) => {
    if(parentElement == null)
        parentElement = mainPageContent
    let itemDiv = document.createElement('span')
    itemDiv.className = 'card w-25 mx-2 mb-3 mt-3 pt-2 d-inline-flex'
    let itemNameH3 = document.createElement('h4')
        itemNameH3.innerText = item.name

    let itemImage = document.createElement('img')
        itemImage.className = 'item-avatar text-center col'
        itemImage.src = item.img_url

    let deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Delete'
        deleteButton.className = 'btn btn-purple mx-2 mt-1 mb-2 text-white'

    deleteButton.addEventListener("click", event =>{
        fetch(`${hostURL}items/${item.id}`, {
            method: "DELETE"
        }).then(()=>{
            event.target.parentNode.remove()
            let count = parseInt(itemCounter.innerText , 10)
            //console.dir(count)
            count--;
            itemCounter.innerHTML = count;
        })
    })
        itemDiv.append(itemNameH3, itemImage, deleteButton)
        //closetDiv.append(itemDiv)

        if(appendAfter)
            parentElement.after(itemDiv)
        else
            prependItem ? parentElement.prepend(itemDiv) : parentElement.append(itemDiv)
        //mainPageContent.append(itemDiv)

}

itemForm.addEventListener('submit', (event) => {
    event.preventDefault()
    //addNewItem()
    addNewItem(mainPageContent.children[0] , true)
    console.log(mainPageContent.children[0])
    itemForm.img.value = ''
    itemForm.name.value = ''
    itemForm.category.value = ''
    
})
const addNewItem = (parentNode=null , appendAfter=false) => {
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

            if(item.error) {
                createItemErrorHandler(item.error)
                // console.log(item.error)
            }else {
                createItemElements(item , true , parentNode , appendAfter)
                
                let count = parseInt(itemCounter.innerText , 10)
            //console.dir(count)
            count++;
            itemCounter.innerHTML = count;
            }
            // console.log(item)
        })
}
// Find error span obj

const createItemErrorHandler = (error) => {
    // let itemErrorSpan = document.createElement('span')
    // itemErrorSpan.innerText = error
    spanErrorItems.innerText = error
    itemAddButton.after(itemErrorSpan)
}

window.addEventListener('click', () => {
    spanErrorLogin.innerText = ''
    spanErrorItems.innerText = ''
})





function hideElement(htmlElement , makeVisible){
    if(makeVisible)
        htmlElement.style.display = defaultElementStyle
    else
        htmlElement.style.display = 'none'
}





// clears out the main-page-content div
function unrenderMPC(){
    while(mainPageContent.firstChild){
        mainPageContent.removeChild(mainPageContent.firstChild)
    }
}

function createOutfitViewer(){
    let viewPanel = document.createElement('div')
    //viewPanel.className = 'card'
    mainPageContent.appendChild(viewPanel)

    //let userId = 1  // change this to the user_id of the logged-in user


    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp =>{
        return resp.json();
    }).then(json =>{
        // this loop will get the individual outfit from the object
        for(let i = 0; i < json['outfits'].length; i++){
            let outfitElements = json['outfits'][i]['items']
            let outfitId = json['outfits'][i]['id']
            // console.log(outfitElements)


            // create the holder div for the outfit
            let holder = document.createElement('span')
            holder.className = 'card container m-3 w-25 d-inline-flex'

            let subDiv = document.createElement('div')
            subDiv.className = 'row p-3'
            holder.appendChild(subDiv)
            mainPageContent.appendChild(holder)

            // this loop does things with the outfit element that we get from the first loop
            for(let j = 0; j < outfitElements.length; j++){
                //console.log(outfitElements[j])

                let img = document.createElement('img')
                img.src= outfitElements[j]['img_url']
                img.className = 'col'
                subDiv.appendChild(img)
            }

            //holder.appendChild(document.createElement('hr'))
            let deleteButton = document.createElement('button')
            deleteButton.innerHTML = 'Delete!'
            deleteButton.className = 'col text-center btn btn-purple text-gw'
            deleteButton.addEventListener('click' , ()=>{
                //console.log('wee')
                console.log(json)
                fetch(`${hostURL}outfits/${outfitId}`, {
                        method: "DELETE"
                    }).then( ()=>{
                        holder.parentElement.removeChild(holder)
                    })

            })

            console.log(json['outfits'][i]['items'])
            if(json['outfits'][i]['items'].length == 0)
                fetch(hostURL + `outfits/${outfitId}` , {
                    method: 'DELETE'
                }).then(console.log('Outfit Deleted'))
                .then(()=>{
                    mainPageContent.removeChild(holder)
                })

            let titleDiv = document.createElement('div')
            titleDiv.className = 'row mb-3 mt-1 mx-5'
            titleDiv.appendChild(deleteButton)

            holder.appendChild(titleDiv)
        }
    })
}



// input the user-id for it to be added into the link
// this function will only be called when the user is logged in, due to the button-action
function createClothesViewer(){
    // this renders clothes
    makeToggler();

    //mainPageContent.appendChild(newClothingDiv)
    fetch(`${hostURL}users/${userId}`)
    .then(resp =>{
        return resp.json();
    }).then(json =>{
        //console.log(json)
        //console.log(userId)
        renderNewItems(json.items.reverse())

        itemCounter.innerHTML = json['items'].length
    })

}


function makeToggler(){
    let itemToggle = document.createElement('p')
    itemToggle.innerHTML = 'Add New Clothing'
    itemToggle.className = 'form-toggle text-right mr-2'

    mainPageContent.appendChild(itemToggle)

    mainPageContent.appendChild(document.createElement('br'))

    itemToggle.addEventListener('click' , ()=>{
        //mainPageContent.prepend(newClothingDiv)
        if(!formOn){
            itemToggle.after(newClothingDiv)
            itemToggle.innerHTML = 'Close'
        }
        else{
            mainPageContent.removeChild(newClothingDiv)
            itemToggle.innerHTML = 'Add New Clothing'
        }
        formOn = !formOn
    })
}

function createOutfitCreator(){

    // create the clothing-creator div
    let outfitDiv = document.createElement('div')
    outfitDiv.id = 'outfit-div'
    outfitDiv.className = 'mt-4 mb-4'
    mainPageContent.appendChild(outfitDiv)

    // create and populate the clothing div
    let clothingDiv = document.createElement('div')
    clothingDiv.id = 'clothing-div'
    clothingDiv.className = 'bg-gw p-2'
    clothingDiv.appendChild(document.createElement('hr'))
    mainPageContent.appendChild(clothingDiv)

    // one big purple line
    let myHeader = document.createElement('header')
    myHeader.className = 'seperator-bar card border-none pt-2'
    let title = document.createElement('p')
    title.innerHTML = 'Your Collection'
    title.className = 'text-gw text-center mb-2'
    myHeader.appendChild(title)
    // thus ends the purple line

    clothingDiv.appendChild(myHeader)



    let currentOutfit = []

    fetch(`${hostURL}users/${userId}`)
    .then(resp =>{
        return resp.json();
    }).then(json =>{
        // console.log(json)
        //console.log(json['items'][0]['img_url'])
        //userId = myUserId
        json.items.forEach(item =>{
            let itemDiv = document.createElement('span')
            itemDiv.id = item['id']
            itemDiv.className = 'card m-2 w-25 row d-inline-flex'

            let itemNameH3 = document.createElement('h4')
                itemNameH3.innerText = item.name
                itemNameH3.className = 'text-center'

            //let imgDiv = document.createElement('div')
            let itemImage = document.createElement('img')
                itemImage.className = 'item-avatar text-center col'
                itemImage.src = item.img_url

                //imgDiv.appendChild(itemImage)
            

            // creates the add / removal button
            let myBtn = document.createElement('button')
            myBtn.innerHTML = 'Add To Outfit'
            myBtn.className = 'btn btn-purple text-gw'

                itemDiv.append(itemNameH3, itemImage , myBtn)
                clothingDiv.append(itemDiv)

                // event listener to add an item to the outfit
                myBtn.addEventListener('click' , ()=>{
                    if(itemDiv.parentNode.id == outfitDiv.id){
                        clothingDiv.prepend(itemDiv)
                        myBtn.innerHTML = 'Add To Outfit'
                        for(let i = 0; i < currentOutfit.length; i++){
                            if(item == currentOutfit[i]){
                                currentOutfit = currentOutfit.splice(i , 1)
                            }
                        }
                        console.log(currentOutfit)
                    }
                    else
                        if(outfitDiv.childNodes.length < 7){    // change this childcount to determine the peoper
                            myBtn.innerHTML = 'Remove'
                            outfitDiv.append(itemDiv)
                            currentOutfit.push(item)
                        }
                })
        
        })

        // add save-features to the outfit
        let saveButton = document.createElement('button')
        saveButton.className = 'btn btn-purple b-block text-gw'
        saveButton.innerHTML = 'Save'
        outfitDiv.appendChild(saveButton)
        outfitDiv.appendChild(document.createElement('br'))
        saveButton.addEventListener('click' , ()=>{
            console.dir(currentOutfit)
            //console.log(myUserId)
            fetch(hostURL + 'outfits' , {
                method: 'POST' , 
                headers: {
                    'Content-Type' : 'application/json' , 
                    'Accept' : 'application/json'
                } ,
                body: JSON.stringify({
                    'user_id' : userId ,
                    'items' : currentOutfit
                })
            }).then(resp =>{
                console.log(resp)
                return resp.json();
            })
        })
    })
    //unrenderMPC();
    //mainPageContent.appendChild(clothingDiv)
}

