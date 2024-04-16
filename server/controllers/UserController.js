const User = require("../models/Users");
const bcrypt = require("bcrypt");
const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/cloudinaryFiles");
const { sendEmail } = require("../utils/sendRegistrationEmail");

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, location, purpose } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }
    const ifUsernameAvailable = await User.findOne({ username });

    if (ifUsernameAvailable) {
      console.log("Username already exists");
      return res.status(200).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Handle avatar upload
    let avatarUrl = null;
    const imageFile = req?.files?.avatar;

    if (imageFile) {
      if (imageFile) {
        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile?.name?.split(".")[1]?.toLowerCase();
        console.log("name", imageFile?.name);
        if (!isFileTypeSupported(fileType, supportedTypes)) {
          console.log("File type not supported");
          return res
            .status(400)
            .json({ success: false, message: "File type not supported" });
        }
        console.log("Uploading file to cloudinary");
        const response = await uploadFileToCloudinary(
          imageFile,
          "Aeonaxy FullStack"
        );
        console.log("Response", response);
        avatarUrl = response?.secure_url;
        console.log("Avatar URL", avatarUrl);
      }
    } else {
      const { avatar } = req.body;
      console.log("Image Link", avatar);
      if (!avatar) {
        return res
          .status(400)
          .json({ success: false, message: "Image file not found" });
      }
      avatarUrl = avatar;
    }

    console.log("Avatar URL", avatarUrl);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      location,
      username,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
      purpose,
    });

    // Save user to the database
    const response = await newUser.save();

    // Send registration email
    const sendEmailResponse = await sendEmail(newUser.email, name);

    if (!sendEmailResponse.success) {
      console.error("Error sending email:", sendEmailResponse.message);
      return res
        .status(500)
        .json({ success: false, message: "Error sending email" });
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const checkUserAvailability = async (req, res) => {
  try {
    // Extract the username and email from the request body or query parameters
    const { username, email } = req.body; // Change to req.query if using query parameters

    // Check if the username is available
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      return res
        .status(200)
        .json({ success: false, message: "Username not available" });
    }

    if (existingEmail) {
      return res
        .status(200)
        .json({ success: false, message: "Email already exists" });
    }

    // If neither the username nor the email is found, they are available
    return res
      .status(200)
      .json({ success: true, message: "Username and email available" });
  } catch (error) {
    // Handle errors
    console.error("Error checking user ID availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const sendEmailResponse = await sendEmail(user.email, user.name);
    if (!sendEmailResponse.success) {
      console.error("Error sending email:", sendEmailResponse.message);
      return res
        .status(500)
        .json({ success: false, message: "Error sending email" });
    }
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error resending email:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  registerUser,
  checkUserAvailability,
  resendEmail,
};
