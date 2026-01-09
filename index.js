import { createUser, getUser, getAllUsers, updateUser, deleteUser } from './user-crud.js';

/**
 * Demo function showing CRUD operations
 */
async function runDemo() {
  try {
    console.log('\n=== Firebase CRUD Operations Demo ===\n');

    // CREATE - Add a new user
    console.log('1️⃣ CREATE: Adding new users...');
    const userId1 = await createUser({
      name: 'John Doe',
      email: 'john@example.com',
      age: 28,
      city: 'New York'
    });

    const userId2 = await createUser({
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25,
      city: 'Los Angeles'
    });

    // READ - Get specific user
    console.log('\n2️⃣ READ: Getting a specific user...');
    const user = await getUser(userId1);
    console.log('User data:', user);

    // READ - Get all users
    console.log('\n3️⃣ READ: Getting all users...');
    const allUsers = await getAllUsers();
    console.log('All users:', allUsers);

    // UPDATE - Update user data
    console.log('\n4️⃣ UPDATE: Updating user data...');
    await updateUser(userId1, {
      age: 29,
      city: 'Boston'
    });

    console.log('Updated user:', await getUser(userId1));

    // DELETE - Delete a user
    console.log('\n5️⃣ DELETE: Deleting a user...');
    await deleteUser(userId2);

    // Final list of users
    console.log('\n📋 Final user list:');
    const finalUsers = await getAllUsers();
    console.log('Final users:', finalUsers);

    console.log('\n✨ Demo completed successfully!');

  } catch (error) {
    console.error('Demo error:', error);
  }
}

// Run the demo
runDemo();

