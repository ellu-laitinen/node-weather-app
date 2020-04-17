const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000  //first port is for heroku, 3000 is for local/if 1st port fails

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Ellu L"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ellu L'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ellu L',
        message: "Find FAQ here"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({error:error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return ({error: error})
            }
            res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Ellu L'
    
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Ellu L'
})

})

app.listen(port, () => {
    console.log('server started on port ' + port)
})