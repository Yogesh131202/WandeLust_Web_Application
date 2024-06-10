
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

// connection with database
main()
.then(()=>{console.log("connected to db")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// setting views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public/css")));

//home page
app.get("/", (req, res)=>{
    res.send("hello i am root");
});

// function for validate schema
const validateListing = (req,res,next)=>{
  let { error } = listingSchema.validate(req.body);
  console.log(req.body);
    if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else{
    next();
  }
}

//index route
app.get("/listings", wrapAsync(async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New route
app.get("/listings/new" , (req, res)=>{
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", wrapAsync(async(req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
}));

// Create route // here use utils file
app.post("/listings", validateListing, wrapAsync(async(req, res)=>{
  const newListing = new Listing( req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync(async(req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
}));

// update route
app.put("/listings/:id",validateListing, wrapAsync(async(req, res)=>{
  //for validation of one route data
  // if(!req.body.listing){
  //   throw new ExpressError(400, "send valid data for listing");
  // }
  // schema validation
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id , {...req.body.listing});
  res.redirect(`/listings/${id}`);
}));

// Delete Route
app.delete("/listings/:id", wrapAsync(async(req, res)=>{
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing)
  res.redirect("/listings");
}));


// app.get("/testListing", async (req, res)=>{
//   let sampleListing = new Listing({
//     title: "my new villa",
//     description: "By the beach",
//     price: 1200,
//     location: "calangute, goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

// for all page not found error handling
app.all("*",(req, res, next)=>{
  next(new ExpressError(404 , "page not found"));
});

// error handling middleware
app.use((err, req, res, next)=>{
  let {statusCode=500, message="something went wrong"} = err;
  res.status(statusCode).render("error.ejs", {message});
  // res.status(statusCode).send(message);
});


// connect with port 8080
app.listen(8080, ()=>{
    console.log("server is listening");
});