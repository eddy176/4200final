const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://eddy:password1234@cluster0-odlqq.mongodb.net/midterm?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

var Sighting = mongoose.model('Sighting', {
    location: { 
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }


});

module.exports = {
    Sighting: Sighting
};