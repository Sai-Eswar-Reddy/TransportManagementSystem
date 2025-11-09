const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Import database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());




// 🔹 API to save Sign In form data
app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO login (Username, Password) VALUES (?, ?)";  
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Error inserting sign-in data:", err);
            return res.status(500).json({ message: "Error signing in" });
        }
        res.status(200).json({ message: "Sign-in successful" });
    });
});

// 🔹 API to save Signup form data
app.post("/signup", (req, res) => {
    const { fullname, email, password, confirmpass } = req.body;

    if (!fullname || !email || !password || !confirmpass) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmpass) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const sql = "INSERT INTO signup (Fullname, Email, Password, Confirmpass) VALUES (?, ?, ?, ?)";
    db.query(sql, [fullname, email, password, confirmpass], (err, result) => {
        if (err) {
            console.error("Error inserting signup data:", err);
            return res.status(500).json({ message: "Error signing up" });
        }
        res.status(200).json({ success: true, message: "Signup successful" });
    });
});

// 🔹 CONTACT FORM API (Saves Form Data to Database)
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO contact (Name, Email, Message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("❌ Error inserting contact form data:", err);
            return res.status(500).json({ message: "Error saving contact form data" });
        }
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    });
});

// API to fetch vehicle types
app.get("/api/vehicles", (req, res) => {
    db.query("SELECT Vehicle_type FROM vehicles", (err, results) => {
        if (err) {
            console.error("Error fetching vehicles:", err);
            res.status(500).send("Server error");
        } else {
            res.json(results);
        }
    });
});

// ✅ API to get Source Cities
app.get("/api/source", (req, res) => {
    const sql = "SELECT City FROM source";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching source cities:", err);
            return res.status(500).json({ message: "Error fetching source cities" });
        }
        res.status(200).json(result);
    });
});

// ✅ API to get Destination Cities
app.get("/api/destination", (req, res) => {
    const sql = "SELECT City FROM destination";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching destination cities:", err);
            return res.status(500).json({ message: "Error fetching destination cities" });
        }
        res.status(200).json(result);
    });
});

// API to Handle Booking Submission
app.post("/api/book", (req, res) => {
    const { userName, mobileNumber, vehicleType, capacity, routeFrom, routeTo, paymentOption } = req.body;

    const query = "INSERT INTO bookings (User_name, Mobile_no, Vehicle_type, Capacity, Source, Destination, Payment_opt) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [userName, mobileNumber, vehicleType, capacity, routeFrom, routeTo, paymentOption], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ message: "Booking failed!" });
        } else {
            res.status(200).json({ message: "Booking successful!" });
        }
    });
});


// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
