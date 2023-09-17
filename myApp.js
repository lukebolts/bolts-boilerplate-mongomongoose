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

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,foundPeople){
    if (err) return console.error(err);
    done(null, foundPeople);
  })
};


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err,foundOne){
    if (err) return console.error(err);
    done(null, foundOne);
  });
}

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, foundById){
    if (err) return console.error(err);
    done(null, foundById)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
        if (err) return console.log(err);
        done(null, updatedPerson)
      })
    })
  };

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, findUpdatedPerson) => {
    if(err) return console.log(err);
    done(null, findUpdatedPerson);
  })
}

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, removedPerson) => {
    if(err) return console.log(err);
    done(null, removedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedPeople) => {
    if(err) return console.log(err);
    done(null, removedPeople);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
      .sort({name: 'asc'})
      .limit(2)
      .select('-age')
      .exec(function(error, people){
          if(err) return console.log(err);
          done(null, people);
      })
  }

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