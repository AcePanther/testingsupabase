import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET /users?status=active&emailLike=gmail.com
router.get("/", async (req, res) => {
  try {
    let query = supabase.from("users").select("*").order("created_at", { ascending: false });

    // Apply dynamic filters
    Object.keys(req.query).forEach((key) => {
      const value = req.query[key];
      if (!value) return;

      if (key.toLowerCase().endsWith("like")) {
        // Partial match
        const column = key.replace(/Like$/i, ""); // emailLike → email
        query = query.ilike(column, `%${value}%`);
      } else {
        // Exact match
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /users/:id - single user
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
