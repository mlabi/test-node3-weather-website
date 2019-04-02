const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()

//Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Michal'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'ML'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!',
        help: 'This is help!!!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address = req.query.address
    geocode (address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        // if (data) {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })

            })
        // }

    })

})

app.get('/help/*',(req, res) => {
    res.render('404',{
        errorMessage: 'Help Page not found!',
        name: 'Michal'
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        errorMessage: 'Page not found!',
        name: 'Michal'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})