const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
// __dirname: current dir which is src
// ../public : go to public dir
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
// customize view viewPath | DEFAULT path is views, now change to templates/viwes
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

/*
app.get('/', (req, res) =>{
  res.send('Hello express')
})
*/

/*
app.get('/help', (req, res) => {
  res.send({
    name: 'tk',
    age: 27
  })
})

app.get('/about', (req,res) => {
  res.send('<h1> About page </h1>')
})
*/

app.get('/',(req, res)=>{
  res.render('index',{
    title: 'Wearther App',
    name: 'tk'
  })
})

app.get('/about',(req, res) =>{
  res.render('about',{
    title: 'About',
    name:'tk'
  })
})

app.get('/help',(req, res) =>{
  res.render('help',{
    title: 'Help',
    heading: 'Node.js',
    message: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    name:'tk'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: '400: You must provide an address'
    })
  }

  geoCode(req.query.address,(error, {latitude,longitude,location} = {}) => {
    if(error){
      console.log(error)
      return res.send({
        error: error
      })
    }

    forecast(latitude,longitude,(eroor,{summary,temperature,precipProbability} = {}) => {
      if(error){
        return res.send({
          error: error
        })
      }

      res.send({
        location: location,
        temperature: temperature,
        precipProbability: precipProbability,
        summary: summary
      })

    })
  })

  //res.send([{
    //location: 'Jaffna',
    //forecast: 55
  //},{
    //location:'kandy',
    //forecast: 20
  //}])
})

app.get('/products',(req, res) => {
  console.log(req.query)
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products : []
  })
})
// app.com
// app.com/help

app.get('/help/*',(req, res)=>{
  res.render('404',{
    title: '404',
    name: 'tk',
    errorMessage: 'Help artical not found'

  })
})

app.get('*',(req, res)=>{
  res.render('404',{
    title: '404',
    name: 'tk',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () =>{
  console.log('server up at 3000')
})
