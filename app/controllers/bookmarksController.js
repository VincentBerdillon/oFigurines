const dataMapper = require("../dataMapper");

const bookmarksController = {

  renderBookmarksPage(req, res, next) {
    try {
      res.render("favoris", { addFigurine: req.session.bookmarks }); 
    }
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },

  addFigurine : async (req, res, next) => {
    try {
      if (!req.session.bookmarks) {
        req.session.bookmarks = [];
      };
      const figurineId = parseInt(req.params.id);
      const figurine = await dataMapper.getOneFigurine(figurineId); 

      const result = req.session.bookmarks.some((fig) => fig.id === figurineId);
      if (result === false) {
        req.session.bookmarks.push(figurine); 
      };
      res.redirect("/bookmarks");
    }
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },

  deleteFigurine : async (req, res, next) => {
    try {
      const figurineId = parseInt(req.params.id);
      req.session.bookmarks = req.session.bookmarks.filter((figurine) => parseInt(figurine.id) !== figurineId);
      res.redirect("/bookmarks");
    }
    catch (err) {
      console.log(err);
      res.send("Erreur 500 - Internal Server Error"); 
    };
  },
};

module.exports = bookmarksController;
