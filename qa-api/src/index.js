let express= require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let helmet = require('helmet');
let morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// express app definition
const app = express();

// database
const learnings = [];

// app security
app.use(helmet());

// parse application/json content-type
app.use(bodyParser.json());

// enable cors
app.use(cors());

// log http requests
app.use(morgan('combined'));

// fetch learnings
app.get('/', (request, response) => {
    const qs = learnings.map(learning => ({
        id: learning.id,
        title: learning.title,
        description: learning.description,
        measurables: learning.measurables.length,
    }));
    response.send(qs);
});

// get single learning
app.get('/:id', (request, response) => {
    const learning = learnings.filter(learning => (learning.id === parseInt(request.params.id)));
    if (learning.length > 1) return response.status(500).send();
    if (learning.length === 0) return response.status(404).send();
    response.send(learning[0]);
});

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://jnabors.auth0.com/.well-known/jwks.json`
    }),
    // validate audience & issuer
    audience: '29iRhelBpxRTPCwKllhC06gEhhiBUDDY',
    issuer: `https://jnabors.auth0.com/`,
    algorithms: ['RS256']
    
})

// create new learning
app.post('/', checkJwt, (req, res) => {
    const { title, description } = req.body;
    const newLearning = {
        id: learnings.length + 1,
        title,
        description,
        measurables: [],
    };
    learnings.push(newLearning);
    res.status(200).send();
});

// add new measurable to existing learning goal
app.post('/measurable/:id', checkJwt, (req, res) => {
    const { measurable } = req.body;

    const learning = learnings.filter(q => (q.id === parseInt(req.params.id)));
    if (learning.length > 1) return res.status(500).send();
    if (learning.length === 0) return res.status(404).send();

    learning[0].measurables.push({
        measurable,
    });

    res.status(200).send();
});

// start server
app.listen(8081, () => {
    console.log('we running on port 8081, fam.')
});
