let bookmarks = []; // in memory space

export async function addBookmark(req,res,next){
    const newBookmark = req.body.newBookmark
    console.log(req.body);

    // validate input bookmark here to avoid xss/sql injection attacks
    console.log(newBookmark);
    bookmarks.push(newBookmark);
    
    res.json({
        message: "Bookmark successfully added!",
        newBookmark
    
    })
}

export async function deleteBookmark(req,res,next){
    const id = parseInt(req.params.id); 

    if (id > bookmarks.length) {
        res.send({
            message: "This bookmark does not exist."
        })
    } else {
        bookmarks.splice(id, 1);

        res.send({
            message: "Bookmark deleted successfully!"
        });
    };

}

export async function getAllBookmarks(req,res,next){
    res.send({
        message: "Hi there! Here are all the bookmarks",
        bookmarks
    });

}