import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// express app definition
const app = express();

// database
const questions = [];

// app security
app.use(helmet());

// parse application/json content-type
app.use(bodyParser.json());

// enable cors
app.use(cors());

// log http requests
app.use(morgan('combined'));

// fetch questions
app.get('/', (request, response) => {
    const qs = questions.map(question => ({
        id: question.id,
        title: question.title,
        description: question.description,
        answers: question.answers.length,
    }));
    response.send(qs);
});

// get single question
app.get(':/id', (request, response) => {
    const question = questions.filter(question => (question.id === parseInt(request.params.id)));
    if (question.length > 1) return response.status(500).send();
    if (question.length === 0) return response.status(404).send();
    response.send(question[0]);
});

// create new question
app.post('/', (req, res) => {
    const { title, description } = req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
    };
    questions.push(newQuestion);
    res.status(200).send();
});

// add new answer to existing question
app.post('/answer/:id', (req, res) => {
    const { answer } = req.body;

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer,
    });

    res.status(200).send();
});

// start server
app.listen(8081, () => {
    console.log('we running on port 8081, fam.')
});
