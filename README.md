# WanderLust - Full-Stack Web Application
Welcome to WanderLust, a full-stack web application designed to cater to the needs of modern travelers. This platform allows users to explore, book, and review properties worldwide, providing a seamless and interactive user experience. Whether you're planning your next vacation or a weekend getaway, WanderLust offers a comprehensive solution for all your travel accommodation needs.

## Table of Contents
- Features
- Technologies Used
- Installation
- Usage
- Project Structure
- Database Design
- API Endpoints
- Challenges and Solutions
- Future Enhancements
- Contributing
- Contact
  
## Features
**1. User Authentication & Authorization**
- **Sign-Up and Login:** Users can create an account or log in using existing credentials. Authentication is managed using Passport.js, ensuring secure access to the platform.
- **Role-Based Access Control:** Different user roles (admin, user) allow for varied access levels, with admins having control over content management.
  
**2. Dynamic Category Navigation**
- **Scrollable Categories:** Users can browse through various property categories like apartments, villas, hostels, and more using a dynamic, scrollable interface.

**3. Property Listings**
- **Detailed Property Pages:** Each property has a dedicated page with detailed information, including images, descriptions, amenities, and pricing.
- **Map Integration:** An interactive map displays the location of the property, allowing users to see nearby attractions and points of interest.
  
**4. Reviews and Ratings**
- **User-Generated Reviews:** Users can leave reviews and ratings for properties they've stayed at, helping others make informed decisions.
- **Review Moderation:** Admins have the ability to moderate reviews to ensure the quality and relevance of user-generated content.
  
**5. Price Transparency**
- **GST Inclusion:** Users can view property prices with or without GST, providing full transparency in pricing.

## Technologies Used

**Frontend**
- **EJS (Embedded JavaScript):** Used for rendering dynamic HTML content on the server side.
- **CSS3:** Custom styling for a modern and user-friendly interface.
- **Bootstrap:** Responsive design framework used for layout and components.
  
**Backend**
- **Node.js:** JavaScript runtime used for server-side logic and API development.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js, used to build RESTful APIs.
  
**Database**
- **MongoDB:** NoSQL database used for storing user data, property details, reviews, and more.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js, used to manage data relationships.
  
**Authentication & Validation**
- **Passport.js:** Middleware for authentication, used to manage user login sessions and secure endpoints.
- **Joi:** Data validation library used to ensure user inputs meet the required criteria.
  
**Deployment**
- **Render:** Platform-as-a-Service (PaaS) used to deploy and host the application.

## Installation
To set up the WanderLust application locally, follow these steps:

**Prerequisites**
- **Node.js** (v14.x or later)
- **MongoDB** (v4.x or later)
- **Git**
  
**Steps**
1. **Clone the repository:**

```bash
git clone https://github.com/Yogesh131202/WandeLust_Web_Application.git
cd WandeLust_Web_Application
```

2. **Install server dependencies:**

```bash
npm install
```
3. **Set up environment variables:** Create a **.env** file in the root directory with the following variables:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wanderlust
SESSION_SECRET=your_secret_key
```
4. **Start the MongoDB server:**

```bash
mongosh
```
5. **Run the application:**

```bash
npm start
```
6. **Access the application:** Open your browser and navigate to http://localhost:3000 to view the application.

## Usage
**Sign-Up and Login**
- **New Users:** Register by providing your email, password, and other required details.
- **Returning Users:** Log in with your email and password to access your account.

**Viewing Property Details**
- **Property Page:** Click on a property to view detailed information, including images, descriptions, amenities, and pricing.
- **Map View:** Use the embedded map to explore the property's location and nearby attractions.

**Booking a Property**
- **Price Calculation:** Choose the desired dates and view the total price, including GST.

**Leaving Reviews**
- **Rate Your Stay:** After your stay, leave a review and rate the property to help future travelers.
- **Review Moderation:** Reviews are moderated by admins to ensure quality.

## Project Structure

```bash
WandeLust_Web_Application/
│
├── public/                 # Static assets like CSS, JavaScript, and images
│   ├── css/                # Custom CSS files
│   ├── js/                 # Custom JavaScript files
│   └── images/             # Image assets
│
├── routes/                 # Express route handlers
│   ├── auth.js             # Authentication routes
│   ├── index.js            # Main application routes
│   └── property.js         # Routes for property-related operations
│
├── views/                  # EJS templates for rendering HTML
│   ├── layouts/            # Layout files (e.g., header, footer)
│   ├── partials/           # Reusable partials (e.g., navigation)
│   ├── home.ejs            # Homepage template
│   ├── property.ejs        # Property detail page template
│   ├── login.ejs           # Login page template
│   └── review.ejs          # Review submission page template
│
├── models/                 # Mongoose models for MongoDB
│   ├── User.js             # User schema and model
│   ├── Property.js         # Property schema and model
│   └── Review.js           # Review schema and model
│
├── controllers/            # Business logic and route handlers
│   ├── authController.js   # Handles authentication logic
│   ├── propertyController.js # Manages property-related operations
│   └── reviewController.js # Manages review-related operations
│
├── config/                 # Configuration files
│   ├── db.js               # MongoDB connection configuration
│   └── passport.js         # Passport.js configuration for authentication
│
├── .env.example            # Example environment variables file
├── app.js                  # Main application entry point
└── package.json            # NPM dependencies and scripts
```

## Database Design
The database is designed to efficiently manage users, properties, and reviews. Below is a simplified schema:

**Users Collection**
```bash
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",  // e.g., "admin" or "user"
  "createdAt": "date",
  "updatedAt": "date"
}
```

**Properties Collection**
```bash
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "location": "string",
  "category": "string",
  "images": ["string"],
  "reviews": ["ObjectId"], // References to Review collection
  "createdAt": "date",
  "updatedAt": "date"
}
```

**Reviews Collection**
```bash
{
  "_id": "ObjectId",
  "user": "ObjectId",  // Reference to User collection
  "property": "ObjectId",  // Reference to Property collection
  "rating": "number",
  "comment": "string",
  "createdAt": "date"
}
```
## API Endpoints

**Authentication Endpoints**
- **POST /auth/signup:** Register a new user.
- **POST /auth/login:** Log in an existing user.
- **POST /auth/logout:** Log out the current user.

**Property Endpoints**
- **GET /properties:** Retrieve a list of all properties.
- **GET /properties/:** Retrieve details of a specific property.
- **POST /properties:** Create a new property (admin only).
- **PUT /properties/:** Update property details (admin only).
- **DELETE /properties/:** Delete a property (admin only).

**Review Endpoints**
- **POST /reviews:** Submit a review for a property.
- **GET /reviews/:** Retrieve all reviews for a specific property.

## Challenges and Solutions

**Dynamic Category Navigation**
- **Challenge:** Implementing a scrollable and interactive category navigation that seamlessly integrates with the backend.
- **Solution:** Used a combination of CSS3 for smooth scrolling and JavaScript to dynamically load content based on user interaction.
  
**Interactive Map Integration**
- **Challenge:** Displaying property locations on a map and allowing users to explore nearby points of interest.
- **Solution:** Integrated Mapbox API, customizing it to display property markers and handle user interactions efficiently.

**User Authentication and Security**
- **Challenge:** Ensuring secure user authentication while maintaining a user-friendly experience.
- **Solution:** Implemented Passport.js for robust authentication and used bcrypt to securely hash passwords. Sessions are managed using cookies with secure and HttpOnly flags.

## Future Enhancements
- **Booking System:** Implement a full-featured booking system, allowing users to reserve properties directly through the platform.
- **Payment Integration:** Add payment gateway integration for secure online transactions.
- **Enhanced Search Filters:** Introduce more advanced filters, such as property ratings, distance from landmarks, and availability during specific dates.
- **Property Recommendations:** Use machine learning to provide personalized property recommendations based on user behavior and preferences.

## Contributing
Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new feature branch: **git checkout -b feature-name.**
3. Make your changes and commit them: **git commit -m 'Add feature-name'.**
4. Push to your branch: **git push origin feature-name.**
5. Submit a pull request.
Please make sure your code follows the project's coding standards and is well-documented.


## Contact
For any inquiries or feedback, feel free to reach out:

Author: Yogesh Bhagat
Email: yogeshsbhagat1312@gmail.com
LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/yogesh-bhagat-11465921b/)
