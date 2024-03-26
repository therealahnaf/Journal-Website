const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    religion: {
      type: String,
      required: true
    }
});


editSchema.statics.postingedit = async function(email, age, gender, country, religion) {
  
        let existingData = await this.findOne({ email });

        if (existingData) {
            existingData.age = age;
            existingData.gender = gender;
            existingData.country = country;
            existingData.religion = religion;
            await existingData.save();
            return existingData; 
        } else {
            const newData = await this.create({ email, age, gender, country, religion });
            return newData; 
        }
};

module.exports = mongoose.model('Edit', editSchema);
