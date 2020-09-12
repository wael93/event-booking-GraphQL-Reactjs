const express = require('express');
const bodyparser = require ('body-parser');
const app = express();
const graphQlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

app.use(bodyparser.json());
app.use(
    '/graphql',
    graphQlHttp({
        schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // Recerver Function 
    rootValue: {
        events: () => {
          return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
        },
        createEvent: (args) => {
          const eventName = args.name;
          return eventName;
        }
      },
      graphiql: true
    })
  );
  
  app.listen(3000);


app.get('/',(req,res,next)=>{
    res.send('Wael Event Booking ');
});
app.listen(3000);