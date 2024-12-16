import express from 'express';
import cors from 'cors'; 
import { addBookmark, deleteBookmark, getAllBookmarks } from './routes/bookmarks.js';


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get all bookmarks
app.get("/bookmarks", getAllBookmarks);

// Add a bookmark 
app.post("/bookmarks", addBookmark);

// Delete a bookmark
app.put("/bookmarks/:id", deleteBookmark);


app.listen(PORT, () => {
    console.log(`This server is running on PORT: ${PORT}`);
})

