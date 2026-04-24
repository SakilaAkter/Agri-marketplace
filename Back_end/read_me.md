You need .env file to connect to db. Find it in wp. Keep .env file in same directory as index.js in backend. You might need to change the directory of ca.pem in .env depending on its location. ca.pem would be in the same location as index.js in the backend folder.

Use master_pass to replace master password

Run "node index.js" in cmd to start backend process