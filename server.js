// const express = require('express');
// const app = express();
// const postgres = require('./postgres.js');
// const fragmentController = require('./controllers/fragment.js');
// const path = require('path');
// const cors = require('cors')
// const PORT = process.env.PORT || 3000;

// require('dotenv').config();

// //___________________
// //Middleware
// //___________________

// app.use(cors());
// // app.use(methodOverride('_method'));
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
// app.use(express.static('public'))
// app.use(cors())

// app.use('/fragments', fragmentController);



// postgres.connect();

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`listening...`);
// })

/////////////////////////////////////////////////////////////////////////
// set up
/////////////////////////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
// const methodOverride = require('method-override');
const app = express();
const path = require('path');
const postgres = require('./postgres.js');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

//___________________
//Middleware
//___________________

//use public folder for static assets*

app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}*

app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings*

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project*

app.use(cors());

//use method override*

// app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Static
// app.use(express.static('public'));
// app.use(express.static(__dirname + "/public"));

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'build')));


//this worked
// if (process.env.NODE_ENV === "production") {
//     //server static content
//     //npm run build
//     app.use(express.static(path.join(__dirname, "client/build")));
//   }
  
//   console.log(__dirname);
//   console.log(path.join(__dirname, "client/build"));
 


/////////////////////////////////////////////////////////////////////////
// routes
/////////////////////////////////////////////////////////////////////////

// const fragmentsController = require('./controllers/fragments.js');
// app.use('/fragments', fragmentsController)

//get profiles
// app.get('/fragments', (req, res) => {
//     postgres.query('SELECT * FROM fragments ORDER BY id ASC;', 
//     (err, results) => {
//         res.json(results)
//     });
// });

//fet all fragments

app.get('/fragments', async (req, res) => {
    try {
      const allFragments = await postgres.query('SELECT * FROM cms ORDER BY id ASC');
      res.json(allFragments.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

// app.get('/', (req, res) => {
//     postgres.query('SELECT * FROM fragments ORDER BY id ASC;', (err, results) => {
//         res.send(results)
//         console.log(results)
//     });
// });

app.post("/add", async (req, res) => {
    try {
      const { date } = req.body;
      const { movie } = req.body;
      const { short } = req.body;
      const { tv_series } = req.body;
      const { book } = req.body;
      const { play } = req.body;
      const { short_story } = req.body;
      const newCMS = postgres.query(`INSERT INTO cms (date, movie, short, tv_series, book, play, short_story) VALUES ('${req.body.date}', '${req.body.movie}', '${req.body.short}', '${req.body.tv_series}', '${req.body.book}', '${req.body.play}', '${req.body.short_story}') RETURNING *`, [date, movie, short, tv_series, book, play, short_story]
        );
    
        res.json(newCMS.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
    // try {
    //   const { date } = req.body;
    //   const { movie } = req.body;
    //   const { short } = req.body;
    //   const { tv_series } = req.body;
    //   const { book } = req.body;
    //   const { play } = req.body;
    //   const { short_story } = req.body;
    //   const newCMS = await postgres.query(
    //     "INSERT INTO cms (date, movie, short, tv_series, book, play, short_story) VALUES ($1, $2 ,$3, $4, $5, $6, $7) RETURNING *",
    //     [date, movie, short, tv_series, book, play, short_story]
    //   );
  
    //   res.json(newCMS.rows[0]);
    // } catch (err) {
    //   console.error(err.message);
    // }
  });

app.delete('/delete/:id', (req, res) => {
    postgres.query(`DELETE FROM cms WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM cms ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

app.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { date } = req.body;
      const { movie } = req.body;
      const { short } = req.body;
      const { tv_series } = req.body;
      const { book } = req.body;
      const { play } = req.body;
      const { short_story } = req.body;
    //   const { email } = req.body;
      const updateCMS =
    postgres.query(`UPDATE cms SET date = '${req.body.date}', movie = '${req.body.movie}', short = '${req.body.short}', tv_series = '${req.body.tv_series}', book = '${req.body.book}', play = '${req.body.play}', short_story = '${req.body.short_story}' WHERE id = ${req.params.id}`,
        [date, movie, short, tv_series, book, play, short_story, id]
      );
  
      res.json(updateCMS);
    } catch (err) {
      console.error(err.message);
    }
    // try {
    //   const { id } = req.params;
    //   const { date } = req.body;
    //   const { movie } = req.body;
    //   const { short } = req.body;
    //   const { tv_series } = req.body;
    //   const { book } = req.body;
    //   const { play } = req.body;
    //   const { short_story } = req.body;
    // //   const { email } = req.body;
    //   const updateCMS = await postgres.query(
    //     'UPDATE cms SET date = $1, movie = $2, short = $3, tv_series = $4, book = $5, play = $6, short_story = $7 WHERE id = $8',
    //     [date, movie, short, tv_series, book, play, short_story, id]
    //   );
  
    //   res.json(updateCMS);
    // } catch (err) {
    //   console.error(err.message);
    // }
  });

//this worked
// app.get("/", (req, res, next) => {
//     res.sendFile( path.resolve( __dirname, '/public' ) );
// });

// const testController = require('./controllers/test.js');
// app.use('/test', testController)

// const fragmentsController = require('./controllers/fragments.js');
// app.use('/', fragmentsController)

// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app


//___________________
//Initial Test route
//___________________

// app.get('/', (req, res)=> {
//   res.send('Hello world')
// })

/////////////////////////////////////////////////////////////////////////
// connection
/////////////////////////////////////////////////////////////////////////

postgres.connect();

// app.listen (3000, () => {
//     console.log('listening...');

// })

//___________________
//Listener
//___________________
// app.listen(PORT, () => console.log( 'Listening on port:', PORT));

  
  app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
  });


