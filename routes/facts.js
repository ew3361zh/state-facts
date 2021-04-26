let express = require('express') //import express library
let router = express.Router() //import router - object

//router will figure out what function to respond and return in response to messages sent
//maps paths in urls to functions that run to provide a response

let stateData = require('./state_fact.json')

//req - request = what is the request being made by the client
//res - response = what the answer is that will be sent back to the client
router.get('/about', function(req, res, next) {
    return res.json({
        'about': 'The best state fact API...EVER.'
    })
})

//created new route for search-by-first-letter query
router.get('/letter-query/:letter', function(req, res, next) {
    //get the letter in the url and change it to uppercase to make sure it will match
    //also set up the html index page to show the user what options are available to them
    let letter = req.params.letter.toUpperCase()
    //get all the state names from stateData in an array to match against
    let stateNames = Object.keys(stateData)
    // console.log(stateMatches)
    //create an empty object for all the matches we find
    let stateMatches = {}
    //traditional for-loop through the stateNames array
    for (i = 0; i < stateNames.length; i++) {
        // console.log(stateMatches[i].startsWith(letter))
        //using the (thank you) startsWith function, checking matches against
        //the req.params.letter from the user query
        if(stateNames[i].startsWith(letter)) {
            // console.log(stateNames[i])
            //get the fact associated with the particular match
            let fact = stateData[stateNames[i]]
            //add both the statename and the fact to the stateMatches object
            stateMatches[stateNames[i]]=fact
        }
    }
    //check the size of the statenames object to see if there are matches
    if (Object.keys(stateMatches).length > 0) {
        //if there are matches, return them to the user
        res.json(stateMatches)
        // console.log(Object.keys(stateMatches).length)
    } else {
        //else, send a 404 no matches found error
        res.status(404).send('No state matches found')
    }
    
})

router.get('/state-list', function(req, res, next) {
    let stateNames = Object.keys(stateData)  // array of all the keys from the object
    res.json(stateNames)
})
// example url: http://localhost:3000/api/fact/New%20Hampshire
// /fact/Minnesota responds with a fact about Minnesota
// /fact/qwerty responds with 404 State Not Found 
router.get('/fact/:stateName', function(req, res, next){
    let stateName = req.params.stateName 
    // let fact = 'This state is home to ' + stateData[stateName]
    let fact = stateData[stateName]
    if (fact) {
        res.json({ name: stateName, fact: fact })
    } else {
        res.status(404).send('State not found')
    }

    /* To send an error to the error handlers
    next(Error('Oops')) // not in a callback/then/catch
    return next(Error('Oops'))  // from a callback/then/catch
    You'd obviously provide more useful info in the message.
    You may have an error object, for example, from Sequelize, that you can pass to the error handler. 
    */
})

//this is always at the end
module.exports = router