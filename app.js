const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id:ID!
        title:String!
        description:String
        price:Float!
        date:String!

    }
    input Eventinput{
        _id:ID!
        title:String!
        description:String
        price:Float!
        date:String!
    }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventinput: Eventinput): Event!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
       const events = {
            _id:args.Math.random().toString(),
            title:args.eventinput.title,
            description:args.eventinput.description,
            price:+args.eventinput.price,
            date:new Date().toISOString(),

        };
        events.push(events);
      }
    },
    graphiql: true
  })
);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
