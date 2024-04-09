// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  console.log(process.env.CLOUD_NAME);
  console.log(process.env.API_KEY);
  console.log(process.env.API_SECRET);
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};
