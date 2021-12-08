//We crate this higher order function in order
//to not repeat all the if else statements for
//each element of the body.XXX object.
//This works only to check if fields are filled.

const validate = (arrayWithValues) => (req, res, next) => {
    try {
      arrayWithValues.forEach((key) => {
        if (!req.body[key]) throw new Error(`${element} is required`);
      });
    } catch (err) {
      return res.status(400).json(error.message);
    }
  
    next();
  };


  module.exports = validate