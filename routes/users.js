import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

// POST new user
router.post("/", async (req, res) => {
  const { name, email, role } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, role }])
    .select();

  if (error) return res.status(500).json({ success: false, error: error.message });
  res.status(201).json({ success: true, data });
});

// PUT update user by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({ name, email, role })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

// DELETE user by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").delete().eq("id", id);

  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, message: `User ${id} deleted`, data });
});

export default router;
