const controller = require('./controller');
const path = require('path');

module.exports = (app) => {
    app.get('/authors', controller.index);
    app.get('/authors/:id', controller.readOne);
    app.post('/authors', controller.create);
    app.put('/authors/:id', controller.update);
    app.delete('/authors/:id', controller.delete);

    app.post('/authors/:authorid/quotes', controller.addQuote);
    app.post('/authors/:authorid/quotes/:quoteid', controller.updateQuote);
    app.delete('/quotes/:quoteid', controller.deleteQuote)

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
      });
}