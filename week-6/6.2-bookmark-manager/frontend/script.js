const API_URL = 'http://localhost:3001/bookmarks';

document.addEventListener('DOMContentLoaded', () => {
    loadBookmarks();

    document.getElementById('add-bookmark-form').addEventListener('submit', async (event) => {
        event.preventDefault();


        const newBookmark = document.getElementById('bookmark-input').value;

        if (!newBookmark) return;

        try {

            await addBookmark(newBookmark);

            loadBookmarks();

            document.getElementById('bookmark-input').value = '';
        } catch (error) {
            console.log('Error adding bookmark:', error);
        }
    });

    document.getElementById('delete-bookmark-form').addEventListener('submit', async (event) => {
        event.preventDefault();

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
        ul.removeChild(li);
    }
}


async function loadBookmarks() {
    try {
        const bookmarks = await fetchBookmarks();
        const ul = document.getElementById('bookmark-list');
        ul.innerHTML = '';

        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement('div');
            li.id = `bookmark-${index}`;
            li.textContent = bookmark;

            const bookmarkContainer = document.createElement('div');
            bookmarkContainer.id = `bookmark-container-${index}`;
            bookmarkContainer.className = `bookmark-container`;
            console.log(`bookmark-container-${index}`);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                removeBookmarkFromDOM(index);
                deleteBookmark(index); 
            });


            bookmarkContainer.appendChild(li);
            bookmarkContainer.appendChild(deleteButton);
            ul.appendChild(bookmarkContainer);
        });
    } catch (error) {
        console.log('Error loading bookmarks:', error);
    }
}


async function fetchBookmarks() {
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        return data.bookmarks;
    } catch (error) {
        console.log('Error fetching bookmarks:', error);
    }
}