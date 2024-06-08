const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/silhouette-photography-of-coconut-palm-trees-CSs8aiN_LkI",
        set: (v)=> v ==="" ? "https://unsplash.com/photos/silhouette-photography-of-coconut-palm-trees-CSs8aiN_LkI": v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;