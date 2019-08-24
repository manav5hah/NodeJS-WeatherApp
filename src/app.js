const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and custom view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Manav Shah'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Manav Shah'
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Manav Shah'
    })
})
app.get('/weather', (req, res) =>{
    if(!req.query.location)
    {
        res.send({error:"Location Required"})
    }
    geocode(req.query.location, (error, location = {})=>{
        if(error)
        {
            res.send({error})
        }
        forecast(location, (error, forecast)=>{
            if(error)
            {
                res.send({error})
            }
            res.send({input:req.query.location,
                      forecast:forecast.body.currently.summary,
                      location:location})
        })
    })
})
app.get('*', (req, res) =>{
    res.render('404', {
        title:'404 Page',
        name:'Manav Shah'
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})