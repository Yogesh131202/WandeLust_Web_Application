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
        default: "https://www.istockphoto.com/photo/tourism-gm1454842745-490366567?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fbeach&utm_medium=affiliate&utm_source=unsplash&utm_term=beach%3A%3A%3A",
        set: (v)=> v ==="" ? "https://www.istockphoto.com/photo/tourism-gm1454842745-490366567?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fbeach&utm_medium=affiliate&utm_source=unsplash&utm_term=beach%3A%3A%3A": v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;