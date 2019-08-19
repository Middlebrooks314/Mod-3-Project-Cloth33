// DOMContentLoaded
document.addEventListener('DOMContentLoaded' , ()=>{
    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit' , (e) =>{
        e.preventDefault();
        hideElement(loginForm , false)
        loadStartPage()
    })
})
// DOMContentLoaded End

function hideElement(htmlElement , makeVisible){
    if(makeVisible)
        htmlElement.style.display = 'block'
    else
        htmlElement.style.display = 'none'
}


function loadStartPage(){
    console.log('Going to Starting Page')
    
}