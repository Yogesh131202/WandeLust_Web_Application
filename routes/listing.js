const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const { populate } = require("../models/review.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");

// For path "/"
router.route("/")
//index route
.get(wrapAsync(listingController.index))
// Create route // here use utils file
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));


//New route
router.get("/new" ,isLoggedIn, listingController.renderNewForm);

// For path "/:id"
router.route("/:id")
    //show route
    .get(wrapAsync(listingController.showListing))

    // update route
    .put(isLoggedIn,isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))

    // Delete Route
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

// Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditform));


module.exports = router;