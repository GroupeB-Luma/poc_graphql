const express = require('express');
const graphqlHTTP = require('express-graphql');

const mongo = require('mongoose');
const app = express();
mongo.connect('mongodb://localhost:27017/Luma', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongo.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphiql', graphqlHTTP({ schema: require('./schema.js'), graphiql: true }));

app.listen(8080, () => {
    console.log('Server running succefully...')
})