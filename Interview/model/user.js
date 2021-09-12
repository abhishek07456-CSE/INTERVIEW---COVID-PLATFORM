const { Schema } = require('mongoose');
const { encrypt } = require('../provider/EncryptDecrypt');
var mongoose = require('mongoose');
const validator =  require('validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type : Number,
        required: true,
        unique: true
        // validate: (value) => value.length == 9
    },
    pincode: {
        type : Number,
        required: true
    },
    role: {
        type: String,
        trim: true,
        validate: (value) => {
            return value == "user" || value == "admin" //further improve this logic or data driven with roles table
        },
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isStrongPassword(value)
        },
        set: (value) => {
            return encrypt(value);
        }
    },
    isActive: {
        type: Boolean,
        trim: true,
        default: false
    },
    symptoms: [],
    last_travel_days: {
        type: Number,
        min: 0,
        default: 0
    },
    contact_with_infected: Boolean
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema);

// user
// admin
// risky

//      pindcode,
//      zone
//      number_of_infected_people
//      number_of_people_vacinated