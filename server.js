import express from "express";
import cors from "cors";
import axios from "axios";

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

app.get("/quiz-data", async (req, res) => {
    try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX"); 
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        res.status(500).json({ error: "Failed to fetch quiz data" });
    }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
