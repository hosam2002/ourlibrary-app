const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const blogSchema = new Schema({
    
    title: {
    
        type: String,
        required: true
    },

    body: {

        type: String,
        required: true
    }

}, { timestamps: true })

const Update = mongoose.model(`Update`, blogSchema)

module.exports = Update