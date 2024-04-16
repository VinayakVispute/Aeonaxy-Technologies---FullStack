## Project README

This project is a Full Stack MultiPage application built with the MERN stack. The frontend is hosted on Netlify [Link](https://aeonaxy-technologies-fullstack.netlify.app/), while the backend is hosted on Render.com. It utilizes nodemailer for sending emails and Cloudinary for cloud storage.

### Stack Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Sending**: Nodemailer
- **Cloud Storage**: Cloudinary

### How to Run the Project
1. **Client**:
   - Navigate to the client folder.
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the development server.

2. **Server**:
   - Navigate to the server folder.
   - Run `npm install` to install dependencies.
   - Run `npm run server` to start the server.

### Environment Variables
**For Client (`.env`):**
- `VITE_SERVER`: Backend server URL

**For Server (`.env`):**
- `MONGODB_URL`: MongoDB connection URL
- `CLOUD_NAME`: [Cloudinary](https://cloudinary.com/) account name
- `API_KEY`: Cloudinary API key
- `API_SECRET`: Cloudinary API secret
- `SEND_HOST`: SMTP server host for sending emails
- `SEND_PORT`: SMTP server port
- `SEND_USER`: SMTP server username
- `SEND_PASS`: SMTP server password
- `SEND_FROM`: Email address to send emails from

### Demo
![Image 1](/path/to/image1.png)
![Image 2](/path/to/image2.png)
![Image 3](/path/to/image3.png)

[Link to Demo Video](https://example.com)
