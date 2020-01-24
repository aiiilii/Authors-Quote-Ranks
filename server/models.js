const mongoose = require ( 'mongoose' );
mongoose.connect ( 'mongodb://localhost/authors' , { useNewUrlParser : true } );
mongoose.set('useFindAndModify', false);

var QuoteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [ true , 'Quote content is required' ],
		minlength: [3, "Quote content must be 3 or more characters long"],
	},
	score: {
		type: Number,
		required: true,
		default: 0
	}
}, {
	timestamps: true
})

var AuthorSchema = new mongoose.Schema ( {
	name : { 
        type : String, 
        required : [ true , 'A name is required' ],
        minlength: [3, "Name must be 3 or more characters long"], 
    } ,
    quotes: [QuoteSchema]
} , {
	timestamps : true
} );

let Author = mongoose.model( 'Author' , AuthorSchema );
module.exports = Author;