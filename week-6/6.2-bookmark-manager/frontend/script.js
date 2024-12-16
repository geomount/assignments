const API_URL = 'http://192.168.149.51:3001/bookmarks';

document.addEventListener('DOMContentLoaded', () => {
    // Initially load and render the bookmarks
    loadBookmarks();

    // Event listener for adding a bookmark
    document.getElementById('add-bookmark-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the new bookmark value from the input field
        const newBookmark = document.getElementById('bookmark-input').value;

        if (!newBookmark) return; // Do nothing if the input is empty

        try {
            // Send the new bookmark to the backend
            await addBookmark(newBookmark);

            // After adding the bookmark, reload the bookmarks list
            loadBookmarks();

            // Clear the input field after adding
            document.getElementById('bookmark-input').value = '';
        } catch (error) {
            console.log('Error adding bookmark:', error);
        }
    });

    // Event listener for deleting a bookmark
    document.getElementById('delete-bookmark-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get the bookmark number (ID) from the input field
        const bookmarkId = document.getElementById('delete-bookmark-input').value;

        if (!bookmarkId) return; // Do nothing if input is empty

        try {
            // Delete the bookmark from the backend
            await deleteBookmark(bookmarkId);

            // After deletion, remove it from the DOM
            removeBookmarkFromDOM(bookmarkId);

            // Clear the input field after deletion
            document.getElementById('delete-bookmark-input').value = '';
        } catch (error) {
            console.log('Error deleting bookmark:', error);
        }
    });
});

// Function to add a bookmark to the backend
async function addBookmark(bookmark) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newBookmark: bookmark })
        });

        if (!response.ok) {
            throw new Error('Failed to add bookmark');
        }

        console.log('Bookmark successfully added');
    } catch (error) {
        console.error('Error adding bookmark:', error);
    }
}

// Function to delete a bookmark from the backend
async function deleteBookmark(bookmarkId) {
    try {
        const response = await fetch(`${API_URL}/${bookmarkId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete bookmark');
        }

        console.log('Bookmark successfully deleted');
    } catch (error) {
        console.error('Error deleting bookmark:', error);
    }
}

// Function to remove the deleted bookmark from the DOM
function removeBookmarkFromDOM(bookmarkId) {
    const ul = document.getElementById(`bookmark-list`);
    const li = document.getElementById(`bookmark-container-${bookmarkId}`); // Assume each <li> has a unique id
    if (li) {
        ul.removeChild(li); // Remove the bookmark item from the DOM
    }
}

// Function to load and render bookmarks
async function loadBookmarks() {
    try {
        const bookmarks = await fetchBookmarks();
        const ul = document.getElementById('bookmark-list');
        ul.innerHTML = ''; // Clear the existing list first

        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement('div');
            li.id = `bookmark-${index}`; // Assign a unique ID to each list item
            li.textContent = bookmark;

            // Add a delete button for each bookmark
            const bookmarkContainer = document.createElement('div');
            bookmarkContainer.id = `bookmark-container-${index}`;
            bookmarkContainer.className = `bookmark-container`;
            console.log(`bookmark-container-${index}`);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                removeBookmarkFromDOM(index); // Remove from DOM when clicked
                deleteBookmark(index); // Remove from backend
            });


            bookmarkContainer.appendChild(li);
            bookmarkContainer.appendChild(deleteButton);
            ul.appendChild(bookmarkContainer);
        });
    } catch (error) {
        console.log('Error loading bookmarks:', error);
    }
}

// Function to fetch bookmarks from the backend
async function fetchBookmarks() {
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        return data.bookmarks; // Assuming your backend returns { bookmarks: [...] }
    } catch (error) {
        console.log('Error fetching bookmarks:', error);
    }
}




// // Fetch bookmarks when the page loads
// document.addEventListener('DOMContentLoaded', () => {
// //   start here
//     try {
//         const bookmarks = fetchBookmarks();
//         ul = document.getElementById("bookmark-list");
//         for (let i = 0; i < bookmarks.length; i++){
//             const li = document.createElement("li");
//             li.appendChild(document.createTextNode(bookmarks[i]));
//             ul.appendChild(li); 
//         }
  
//     } catch (error) {
//         console.log(error);
//     }


// });

// // Fetch bookmarks from the backend
// async function fetchBookmarks() {
//     //  start here
//     try {
//         const response = await fetch(API_URL, {
//             method: "GET"
//         })
//         const data = await response.json();
        
//         return data.bookmarks

//     } catch (error) {
//         console.log(error);

//     }

// }

// // Add a bookmark to the DOM
// async function addBookmarkToDOM(bookmark) {
//     //  start here
//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json', // Ensure this header is set correctly
//             },
//             body: JSON.stringify({
//                 "newBookmark": bookmark
//             })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             // add logic to refersh the page
//             console.log('Bookmark added:', data);
//             // location.reload();
//         } else {
//             console.error('Error adding bookmark:', response.status, await response.text());
//         }

//         location.reload();

//     } catch (error) {

//         console.log(error);
//     }
// }

// // Add a new bookmark
// document.getElementById('add-bookmark-btn').addEventListener('click', () => {
//       //  start here
//       const newBookmark = document.getElementById('bookmark-url').value; 
//       console.log(newBookmark);
//       console.log(newBookmark.toString());
//       addBookmarkToDOM(newBookmark);
// });

// // Delete a bookmark
// document.getElementById('delete-bookmark-btn').addEventListener('click', () => {

//     const removeId = document.getElementById('bookmark-id').value; 
//     deleteBookmark(removeId);
// });

// async function deleteBookmark(id) {

//      try {
//         const response = await fetch(API_URL + `/${id}`, {
//             method: "PUT",
//         });

//         if (response.ok) {
//             const data = await response.json();
//             // add logic to refersh the page
//             location.reload();

//             console.log('Bookmark added:', data);
//         } else {
//             console.error('Error adding bookmark:', response.status, await response.text());
//         }

//     } catch (error) {

//         console.log(error);
//     }
     
// }