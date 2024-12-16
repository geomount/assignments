const url = "http://192.168.29.46:3000";  // Change this to your backend URL

// Signup function
async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    console.log(username, password);

    try {
        const response = await fetch(url + "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Specify JSON request
            },
            body: JSON.stringify({
                username: username, 
                password: password
            })
        });

        const data = await response.json();
        console.log(data);
        document.getElementById("beResponse").textContent = data.message;

    } catch (error) {
        console.log("Error:", error);
        document.getElementById("beResponse").textContent = "An error occurred: " + error.message;
    }
}

// Signin function
async function signin() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;
    console.log(username, password);

    try {
        const response = await fetch(url + "/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Specify JSON request
            },
            body: JSON.stringify({
                username: username, 
                password: password
            })
        });

        const data = await response.json();
        console.log(data);

        if (data.token) {
            // Store JWT token in localStorage
            localStorage.setItem("authorization", data.token);
        } else {
            console.error("No token returned");
        }

        await getUserInfo();
    } catch (error) {
        console.log("Error:", error);
        alert("Error: " + error.message);
    }
}

// Fetch user info from the server
async function getUserInfo() {
    try {
        const token = localStorage.getItem("authorization");  // Get token from localStorage

        if (!token) {
            document.getElementById("beResponse").textContent = token;
            return;
        }

        const response = await fetch(url + "/me", {
            method: "GET",
            headers: {
                "Authorization": token  // Send token as Bearer token
            }
        });

        const data = await response.json();
        document.getElementById("beResponse").textContent = "Username: " + data.username;

    } catch (error) {
        console.log(error);
        alert("Failed to fetch user info.");
    }
}

async function logout(){
    localStorage.removeItem("authorization");
    await getUserInfo();
}