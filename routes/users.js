import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET /users with dynamic filters
router.get("/", async (req, res) => {
  try {
    let query = supabase.from("users").select("*");

    // Loop through all query params and add them as filters
    for (const [key, value] of Object.entries(req.query)) {
      query = query.eq(key, value);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
