
console.log("JavaScript Loaded")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (r) => {
    r.preventDefault()

    const location = search.value
    fetch('https://shah13-weather-application.herokuapp.com//weather?location='+location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else{
            messageOne.textContent = data.location.place_name
            messageTwo.textContent = data.forecast
        }
    })
})
})