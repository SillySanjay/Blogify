const {Schema,model, Mongoose} = require('mongoose');

const blogschema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverimageURL:{
        type: String,
        required: false, // it is by default false
    },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }
},
    { timestamps:true }
);

const blog = model("blog",blogschema);

module.exports = blog;