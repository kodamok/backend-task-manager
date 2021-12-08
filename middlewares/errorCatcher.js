const errorAdmin = (err, req, res, next) => {
    console.log(`There was an error ${err}`);
    res.status(500).send('<h1> ERROR 500 </h1>')
  }


module.exports = errorAdmin