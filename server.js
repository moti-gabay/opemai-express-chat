import express from "express"
import OpenAi from "openai";
import "dotenv/config"
import db from "./db/connenct.js";

const app = express();
app.use(express.json());

const PORT = 3003;

const client = new OpenAi();
const chatCollection = await db.collection("chat");

app.get("/",async (req, res) => {
    try {
        const chats = await chatCollection.find({}).toArray();

        return res.status(200).json({ chats })
    } catch (error) {
        console.error(error)
    }
})

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(500).json({ msg: "message is required" })
        }

        const response = await client.responses.create({
            model: "gpt-5.4-mini",
            tools: [
                { type: "web_search" }
            ],
            input: message
        })
        chatCollection.insertOne({ reply: response.output_text })
        return res.json({ reply: response.output_text })
    } catch (error) {
        console.error("error", error)
        return res.status(500).json({ error: "Internal server error" })
    }
})






app.use(express.json());

app.listen(PORT, () => {
    console.log("server is runnign on ", PORT);

})