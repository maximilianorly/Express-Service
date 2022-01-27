const { connectionString } = require('./config');
const mongoose = require('mongoose');

mongoose.connect(connectionString, {
    useNewUrlParser: true
});

const testSchema = new mongoose.Schema({
    name: String,
    text: String,
    owner: String
});

const Test = mongoose.model('Test', testSchema);

/**
 * 
 * @param {object} data data to store
 * 
 * @returns {object} { isSuccessful: Boolean, message: String }
 */
const storeData = async (data) => {
    const response = { isSuccessful: false, message: '' };

    const doc = new Test({
        name: data.body.name,
        text: data.body.text,
        owner: data.body.owner
    });

    /**
     * @function result saves a new document entry
     * 
     * @returns {mongoose.Model} saved entry
     */
    const result = await doc.save().then(result => {
        response.isSuccessful = true;
        response.message = `${result}`;
    }).catch(err => response.message = error);
    // .finally(() => ...close());

    return response;
}


module.exports = storeData;