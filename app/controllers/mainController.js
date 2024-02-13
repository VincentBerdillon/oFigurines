const dataMapper = require("../dataMapper");

const mainController = {

  renderHomePage : async (req, res, next) => {
   
    try {
      const figurines = await dataMapper.getAllFigurines();
      if (!figurines) {return next();}

      const avgNotes = await dataMapper.getAllNotes();

      avgNotes.forEach(e => {
        let noteFigurineId = e.figurine_id;
        let note = e.note;
        figurines.forEach(figurine => {
          let figurineId = figurine.id
          if(figurineId === noteFigurineId){
            figurine.note = note
          };
        });
      });
     
      res.render("accueil", { figurines, isConnected: req.session.login });
    }
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },

  renderArticlePage : async (req, res, next) => {
    
    const figurineId = parseInt(req.params.id);
    if(isNaN(figurineId)){return next();}
    
    const figurinesIdTest = await dataMapper.getAllFigurines();
    const testId = figurinesIdTest.some((test) => test.id === figurineId);
    if (!testId){return next()};

    try {
      const figurine = await dataMapper.getOneFigurine(figurineId);
      const figurineReviews = await dataMapper.getAllReviews(figurineId);
      const avgNote = await dataMapper.getNote(figurineId);
      figurine.note = avgNote.note;
      res.render("article", { figurine, figurineReviews });
    } 
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },

  leftMenu : async (req, res, next) => {
    try{
      const categoryNumber = await dataMapper.getCategoryNumber();
      res.locals.leftMenu = categoryNumber;
      next();
    }
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },

  renderCategoryPage : async (req, res, next) => {
    const category = req.params.category;
    try{
      const figurines = await dataMapper.getFigurinesByCategory(category)
      res.render('accueil', {figurines})
    }
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },
  
};

module.exports = mainController;
