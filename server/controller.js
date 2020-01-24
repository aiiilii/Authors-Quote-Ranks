var Author = require('./models');

module.exports = {
    
    index : (req, res) => {
        Author.find ({}).sort({name: 1})
        .then ( data => {
            console.log('displaying all data:', data);
            res.json({message: 'success', data: data});
        })
        .catch ( err => {
            console.log('error', err);
            res.json({message: 'error', error: err});
        })
    },

    readOne : (req, res) => {
        Author.findById (req.params.id)
        .then ( data => {
            console.log('displaying one author', data);
            res.json({message: 'success', data: data});
        })
        .catch ( err => {
            console.log('error', err);
            res.json({message: 'error', error: err});
        })
    },

    create : (req, res) => {
        Author.create ({
            name : req.body.name,
            // description : req.body.description,
            // completed : req.body.completed,
        })
        .then ( data => {
            console.log('successfully added', data);
            res.json({message: 'success', data: data});
        })
        .catch ( err => {
            console.log('error', err);
            res.json({message: 'error', error: err});
        })
    },

    update : (req, res) => {
        Author.findByIdAndUpdate (req.params.id, {
            name : req.body.name,
            // description : req.body.description,
            // completed : req.body.completed,
        }, {runValidators: true, new: true})
        .then ( data => {
            console.log('successfully updated', data);
            res.json({message: 'success', data: data});
        })
        .catch ( err => {
            console.log('error', err);
            res.json({message: 'error', error: err});
        })
    },

    delete : (req, res) => {
        Author.findByIdAndDelete (req.params.id)
        .then ( data => {
            console.log('successfully deleted', data);
            res.json({message: 'success', data: data});
        })
        .catch ( err => {
            console.log('error', err);
            res.json({message: 'error', error: err});
        })
    },


    addQuote: (req, res) => {
		console.log(req.body)
		Author.findByIdAndUpdate(req.params.authorid, {
            $push: {quotes: {content: req.body.content}}
        }, {runValidators: true, new: true})
		.then ( data => {
            console.log('successfully added quote', data);
            res.json({message: 'success', data: data});
        })
        .catch( err => {
            console.log('error', err);
            res.json({message: 'error', error: err})
        })
	},

	updateQuote: (req, res) => {
		if (req.body.value > 0) {
			Author.findOneAndUpdate( {'quotes._id': req.params.quoteid}, {$inc: {'quotes.$.score': 1}})
			.then ( data => {
                console.log('successfully upvoted', data);
                res.json({message: 'success', data: data});
            })
			.catch( err => {
                console.log('error', err);
                res.json({message: 'error', error: err})
            })
		} else {
			Author.findOneAndUpdate( {'quotes._id': req.params.quoteid}, {$inc: {'quotes.$.score': -1}})
			.then ( data => {
                console.log('successfully downvoted', data);
                res.json({message: 'success', data: data});
            })
			.catch( err => {
                console.log('error', err);
                res.json({message: 'error', error: err})
            })
		}
	},

	deleteQuote: (req, res) => {
        console.log(req.params.quoteid);
		Author.findOneAndUpdate( {'quotes._id': req.params.quoteid}, {$pull: {quotes: {'_id': req.params.quoteid}}})
		.then ( data => {
            console.log('successfully deleted', data);
            res.json({message: 'success', data: data});
        })
		.catch( err => {
            console.log('error', err);
            res.json({message: 'error', error: err})
        })
	}
}