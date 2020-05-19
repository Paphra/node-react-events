const express = require('express')
const path = require('path')

// import middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

// connection to mongoese
var dev_db_url = 'mongodb://localhost:27017/ultimatesports';

var db_url = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', ()=>{
  console.log('Connected to the database.');
});

/** API Routes */
var apiAbout = require('./routes/APIAbout');
var apiBooks = require('./routes/APIBooks');
var apiEvents = require('./routes/APIEvents');
var apiUsers = require('./routes/APIUsers');
var apiCategories = require('./routes/APICategories');
var apiPartners = require('./routes/APIPartners');
var apiSubscribers = require('./routes/APISubscribers');
/** END API Routes */

// setup deafult port
const PORT = process.env.PORT || 4000

// express apps
app = express()
api = express()

// apply the middleware
app.use(cors())
app.use(helmet())
app.use(compression())
//app.use(express.json())
//app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use( bodyParser.json( {
	limit: "50mb", extended: true
} ) )
app.use( bodyParser.urlencoded( {
	limit: '50mb', extended: true
}))

/** Register API Routes */
app.use( '/api', api )

/** Register API Routes */
api.use('/about', apiAbout);
api.use('/books', apiBooks);
api.use('/users', apiUsers);
api.use('/events', apiEvents);
api.use('/partners', apiPartners);
api.use('/categories', apiCategories);
api.use('/subscribers', apiSubscribers);
/** END Register API Routes */

if(process.env.NODE_ENV && process.env.NODE_ENV !== 'development'){
	app.use(express.static(path.join(__dirname, 'build')))
	app.get('*', (req, res)=>{
		res.sendFile(path.join(__dirname, 'build', 'index.html'))
	})
}

// handle errors
app.use( ( err, req, res, next ) => {
	console.error(err.stack)
	res.status(500).send("Something went wrong!")
})

// start
app.listen(PORT, function(){
	console.log(`Server is running on: ${PORT}`)
})
