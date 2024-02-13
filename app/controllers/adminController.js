const dataMapper = require("../dataMapper");

const adminController = {

  getLogin : (req, res, next) => {

    try{
    const error = req.query.error;
    res.render("login", {error});
    }
    catch (err) {
    console.error(err);
    res.status(500).send("500-Server error");
    }

  },

  getLogout : (req, res, next) => {

    try{
    req.session.login = '';
    res.redirect("/");
    }
    catch (err) {
    console.error(err);
    res.status(500).send("500-Server error");
    }

  },
    
  postLogin : (req, res, next) => {

    try{
    const login = req.body.login;
    req.session.login = login;
    if(login === 'Vincent'){
      res.redirect("/");
      } else {
      res.redirect("/login?error=wrong");
      };
    }
    catch (err) {
      console.error(err);
      res.status(500).send("500-Server error");
    };

  },
    
  renderFormFigurine : (req, res, next) => {
    
    try{
    if (req.session.login=='Vincent'){
      res.render("formFig");}
    }
    catch (err) {
      console.error(err);
      res.status(500).send("500-Server error");
    };

  },
      
  addFigurine : async (req, res, next) => {
        
  try{
    const figurine = await dataMapper.insertFigurine(req.body);
    res.redirect("/");
    }
    catch (err) {
      console.error(err);
      res.status(500).send("500-Server error");
    };
  },

  renderDelFormFigurine : async (req, res, next) => {
   
    try {
      const figurines = await dataMapper.getAllFigurines();
      if (!figurines) {return next();}
     
      res.render("delFormFig", { figurines });
    }
    catch (err) {
      console.error(err);
      res.status(500).send("500-Server error");
    };
  },

  deleteFigurine : async (req, res, next) => {
        
    try{
      const figurines = await dataMapper.deleteFigurineFromDB(req.body);
      res.redirect("/");
      }
      catch (err) {
        console.error(err);
        res.status(500).send("500-Server error");
      };
    },


};

module.exports = adminController;