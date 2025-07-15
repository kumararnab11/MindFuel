const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    const mongoURL = process.env.MONGODB_URL;

    if (!mongoURL) {
        console.error("❌ MONGODB_URL is not defined in the environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURL);
        console.log("✅ DB Connected Successfully");
    } catch (error) {
        console.error("❌ DB Connection Failed");
        console.error(error);
        process.exit(1);
    }
};
