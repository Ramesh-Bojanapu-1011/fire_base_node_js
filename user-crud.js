const { database } = require("./firebase-config");
const { ref, push, get, update, remove } = require("./firebase-config");

const USERS_PATH = "users";

/**
 * CREATE - Add a new user to Firebase
 * @param {Object} userData - User data object
 * @returns {Promise<string>} - User ID of the newly created user
 */
async function createUser(userData) {
  try {
    const usersRef = ref(database, USERS_PATH);
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      users.forEach((user) => {
        if (user.email === userData.email) {
          throw new Error("User with this email already exists");
        }
      });
    }

    const newUserRef = await push(usersRef, {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log("✅ User created successfully with ID:", newUserRef.key);
    return newUserRef.key;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
}

/**
 * READ - Get a user by ID
 * @param {string} userId - User ID to retrieve
 * @returns {Promise<Object>} - User data object
 */
async function getUser(userId) {
  try {
    const userRef = ref(database, `${USERS_PATH}/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      console.log("✅ User retrieved successfully");
      return { id: userId, ...snapshot.val() };
    } else {
      console.log("⚠️ User not found");
      return null;
    }
  } catch (error) {
    console.error("❌ Error retrieving user:", error);
    throw error;
  }
}

/**
 * READ - Get all users
 * @returns {Promise<Array>} - Array of all users
 */
async function getAllUsers() {
  try {
    const usersRef = ref(database, USERS_PATH);
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      console.log(`✅ Retrieved ${users.length} users`);
      return users;
    } else {
      console.log("⚠️ No users found");
      return [];
    }
  } catch (error) {
    console.error("❌ Error retrieving users:", error);
    throw error;
  }
}

/**
 * UPDATE - Update a user's data
 * @param {string} userId - User ID to update
 * @param {Object} updatedData - Updated user data
 * @returns {Promise<void>}
 */
async function updateUser(userId, updatedData) {
  try {
    const userRef = ref(database, `${USERS_PATH}/${userId}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User not found");
    }

    await update(userRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
    console.log("✅ User updated successfully");
  } catch (error) {
    console.error("❌ Error updating user:", error);
    throw error;
  }
}

/**
 * DELETE - Delete a user
 * @param {string} userId - User ID to delete
 * @returns {Promise<void>}
 */
async function deleteUser(userId) {
  try {
    const userRef = ref(database, `${USERS_PATH}/${userId}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User not found");
    }

    await remove(userRef);
    console.log("✅ User deleted successfully");
    return;
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
