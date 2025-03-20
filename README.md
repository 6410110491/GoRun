# GoRun

This project is built using React, Node.js, Express, and MongoDB.

# Getting Started

Follow these steps to set up and run the project

## Environment Variables
Create a .env file in both the backend/ and the root project folder. Use the templates below as a reference.
### Example .env file for backend (backend/.env):
```env
PORT=4000
DATABASE="mongodb://localhost:27017/db_name" 
JWT_SECRET='your-jwt-secret'
SESSION_SECRET_KEY='your-session-secret'
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GOOGLE_APPLICATION_CREDENTIALS="key.json"

FRONTEND_URL=http://localhost:3000 

USERADMIN=your-admin-username
EMAILADMIN=your-admin-email
PASSWORDADMIN=your-admin-password
```

### Example .env file for frontend (.env in root directory):
```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

REACT_APP_EMAILJS_SERVICE_ID=your-emailjs-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
REACT_APP_EMAILJS_TEMPLATE_RESETPASSWORD_ID=your-emailjs-resetpassword-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=your-emailjs-public-key

REACT_APP_EMAILJS_FROM_NAME=GoRun Webapplication
REACT_APP_EMAILJS_FROM_EMAIL=your-email-address

REACT_APP_DOMAIN=http://localhost:4000

REACT_APP_GOOGLE_MAP_API=your-google-map-api-key

REACT_APP_API_URL=http://localhost:4000
REACT_APP_FRONTEND_URL=http://localhost:3000`
```

### Example key.json file for backend (backend/key.json):
1. Go to [Cloud Storage Buckets](https://console.cloud.google.com/storage/browser)

2. Create a bucket 

3. Navigate to IAM & Admin > Service Accounts.

4. Create a new service account and assign a role such as Storage Object Admin.

5. Under Keys, click Add Key and select JSON to download the credentials.

6. Use the downloaded key.json file to authenticate and interact with Google Cloud Storage in your backend.

#### Example key.json
```key.json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCoMm7SeMouBqnU...",
  "client_email": "your-service-account@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project-id.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

```


## Installation
Clone the repository

Navigate to the project directory

Install backend dependencies

Install frontend dependencies

## Running the Application

Start the Backend Server:
### `npm start`
The server will run at http://localhost:4000


Start the Frontend:
### `npm start`
The application will be available at http://localhost:3000
