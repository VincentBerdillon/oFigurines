const express = require("express");

// CONTROLLERS
const mainController = require("./controllers/mainController");
const bookmarksController = require("./controllers/bookmarksController");
const adminController = require("./controllers/adminController")

const router = express.Router();

//MIDDELWARES
const isConnected = require("./middelwares/isConnected");
router.use(isConnected);
router.use(mainController.leftMenu)

//ROUTES
router.get("/", mainController.renderHomePage);

router.get("/article/:id", mainController.renderArticlePage);

router.get("/bookmarks", bookmarksController.renderBookmarksPage);
router.get("/bookmarks/add/:id", bookmarksController.addFigurine);
router.get("/bookmarks/delete/:id", bookmarksController.deleteFigurine);

router.get('/category/:category', mainController.renderCategoryPage)

router.get("/login", adminController.getLogin);
router.post("/login", adminController.postLogin);
router.get("/logout", adminController.getLogout);

router.get("/addFigurine", adminController.renderFormFigurine);
router.post("/addFigurine", adminController.addFigurine);

router.get("/delFigurine", adminController.renderDelFormFigurine);
router.post("/delFigurine", adminController.deleteFigurine);

module.exports = router;
