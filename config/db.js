const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    console.error("Error: MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose
.connect(mongoUri)
.then(() => {
    console.log("✅ Database connected successfully to:", mongoose.connection.host);
})
.catch((err) => {
    // Detailed masking to check for leading/trailing spaces
    const maskedUri = mongoUri.trim().replace(/\/\/.*@/, "//***@");
    console.error("❌ MongoDB connection error:");
    console.error(`Attempted URI: [${maskedUri}] (Length: ${mongoUri.length})`);
    console.error(`Error message: ${err.message}`);
    console.error("Tip: If the error mentions 'me', check if your username/password contains an unencoded '@' symbol.");
});

module.exports = mongoose.connection;
