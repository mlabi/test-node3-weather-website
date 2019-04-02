console.log('Client side javascript file is loaded!')





const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading message form weather app ...'
    messageTwo.textContent = ''
    const location = search.value
    // if (location) {
        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent =data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast.summary + ', temperatura ' + data.forecast.temperature + '^C'
                    console.log(data.forecast)
                }
            })
        })
    // }
})