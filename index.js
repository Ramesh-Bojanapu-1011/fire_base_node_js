import express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./user-crud.js";
import moragan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(moragan("common"));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Firebase CRUD API is running" });
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, age, city } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const userId = await createUser({ name, email, age, city });
    const createdUser = await getUser(userId);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to create user" });
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID query parameter is required" });
    }
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updates = req.body || {};
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No data provided to update" });
    }

    await updateUser(req.params.id, updates);
    const updatedUser = await getUser(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    const status = error.message === "User not found" ? 404 : 400;
    res
      .status(status)
      .json({ error: error.message || "Failed to update user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    const status = error.message === "User not found" ? 404 : 400;
    res
      .status(status)
      .json({ error: error.message || "Failed to delete user" });
  }
});

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
