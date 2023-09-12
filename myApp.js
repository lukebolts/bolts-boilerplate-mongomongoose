require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods : [String]
});

let Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function(done) {
  var princeRodgers = new Person({name: 'Prince Rodgers Nelson', age: 69, favoriteFoods: ['Starfish', 'Coffee', 'Fruit Cocktail']});
  princeRodgers.save(function(err,data){
    if (err) return console.error(err)
    done(null, data)
  });
};


var arrayOfPeople = [
  {name: 'Prince Rodgers Nelson', age: 69, favoriteFoods: ['Starfish', 'Coffee', 'Fruit Cocktail']}, 
  {name: 'Joni Mitchell', age: 77, favoriteFoods: ['Coffee', 'Croissants']},
  {name: 'Millie Jackson', age: 88, favoriteFoods: ['Cornbread', 'Grits']}
  ]

const createManyPeople = function(arrayOfPeople, done){
  Person.create(arrayOfPeople, function(err,people){
    if (err) return console.error(err)
    done(null, people)
  });
};

var personName = "Joni Mitchell"

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,joni){}
    if (err) return console.error(err)
    done(null, joni);
  };
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
