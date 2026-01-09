# Firebase Node.js CRUD Operations

This project demonstrates how to connect Firebase to a Node.js application and perform CRUD (Create, Read, Update, Delete) operations on user data.

## Prerequisites

- Node.js (v14 or higher)
- A Firebase project (create one at [Firebase Console](https://console.firebase.google.com))
- Firebase Realtime Database enabled

## Setup Instructions

### 1. Install Dependencies

Dependencies are already included in `package.json`:

- `firebase` - Firebase SDK for Node.js
- `nodemon` - Auto-reload on file changes

If needed, run:

```bash
npm install
```

### 2. Configure Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click on **Project Settings** (gear icon)
4. Go to **Service Accounts** tab
5. Copy your Firebase configuration credentials

Update `firebase-config.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};
```

### 3. Enable Realtime Database

1. In Firebase Console, go to **Realtime Database**
2. Click **Create Database**
3. Choose your region and start in **test mode** (for development)
4. Copy the database URL and add it to `firebase-config.js`

## Project Structure

```
firebase-node-js/
├── index.js              # Main entry point with demo
├── firebase-config.js    # Firebase initialization
├── user-crud.js          # CRUD operations
├── package.json          # Project dependencies
├── .env.example          # Example environment variables
└── README.md             # This file
```

## CRUD Operations

### Create User

```javascript
const userId = await createUser({
  name: 'John Doe',
  email: 'john@example.com',
  age: 28,
  city: 'New York'
});
```

### Read User (by ID)

```javascript
const user = await getUser(userId);
console.log(user);
```

### Read All Users

```javascript
const users = await getAllUsers();
console.log(users);
```

### Update User

```javascript
await updateUser(userId, {
  age: 29,
  city: 'Boston'
});
```

### Delete User

```javascript
await deleteUser(userId);
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm start
```

### Run Once

```bash
node index.js
```

## Firebase Database Rules

For testing purposes, set these rules in Firebase Console under **Database Rules**:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **For production**, implement proper authentication and security rules!

## Security Best Practices

1. **Never commit credentials** - Keep sensitive data in environment variables
2. **Use `.gitignore`** - Add `node_modules/`, `.env`, and credentials files
3. **Implement authentication** - Use Firebase Auth for real applications
4. **Set proper security rules** - Restrict database access in production

## Example Output

```
=== Firebase CRUD Operations Demo ===

1️⃣ CREATE: Adding new users...
✅ User created successfully with ID: abc123def456

2️⃣ READ: Getting a specific user...
✅ User retrieved successfully
User data: {
  id: 'abc123def456',
  name: 'John Doe',
  email: 'john@example.com',
  age: 28,
  city: 'New York',
  createdAt: '2026-01-08T10:30:00.000Z'
}

3️⃣ READ: Getting all users...
✅ Retrieved 2 users

4️⃣ UPDATE: Updating user data...
✅ User updated successfully

5️⃣ DELETE: Deleting a user...
✅ User deleted successfully

✨ Demo completed successfully!
```

## Troubleshooting

### Connection Issues

- Verify Firebase credentials are correct
- Check if Realtime Database is enabled
- Ensure database URL is correct in `firebase-config.js`

### "User not found" Error

- Check if the user ID exists in the database
- Verify database rules allow read/write access

### Permission Denied

- Check Firebase database security rules
- Ensure your API key has the required permissions

## Next Steps

- Add user authentication with Firebase Auth
- Implement input validation
- Add error handling middleware
- Create REST API endpoints (Express.js)
- Add user data encryption

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Firebase SDK for Node.js](https://firebase.google.com/docs/database/admin/start)

## License

ISC
