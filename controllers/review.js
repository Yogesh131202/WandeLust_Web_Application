
const Listing = require("../models/listing");
const Review = require("../models/review");

// Post/create  Review Route
module.exports.createReview = async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!!");
  
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
  };

// delete  Review Route
  module.exports.destroyReview = async(req, res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!!");
  
    res.redirect(`/listings/${id}`);
  };