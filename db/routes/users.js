import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET /users - list all users
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /users/:id - get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) return res.status(404).json({ success: false, message: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
