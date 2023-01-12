////////////
// Server
////////////

// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

// NB: To control the logging of routes and status codes in the console in real time, comment out/uncomment app.use(morgan('dev')), below.

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

////////////
// Routes
////////////

// Define and mount principal resource route
const passwordsApiRoutes = require('./routes/passwords-api');
app.use('/api/passwords', passwordsApiRoutes);


// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Mount Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
