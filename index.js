const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            return res.status(500).send("Unable to scan directory");
        }
        res.render("index", { files });  
    });
});

app.get("/files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, fileData) => {
        if (err) {
            return res.status(500).send("Unable to read file");
        }
        res.render("show", {filename : req.params.filename, fileData});
    });
});

app.get("/edit/:filename", (req, res) => {
    res.render("edit", {filename : req.params.filename});
});

app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, err => {
        res.redirect("/");
    });
});

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect("/")
    })
}) 

app.get("/editContent/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, fileData) => {
        if (err) {
            return res.status(500).send("Unable to read file");
        }
        res.render("editContent", {filename : req.params.filename, fileData});
    });
});

app.post("/editContent", (req, res) => {
    fs.writeFile(`./files/${req.body.filename}`, req.body.previousContent, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            res.redirect(`./files/${req.body.filename}`);
        }
    });

    console.log(req.body);
});

app.delete('/delete/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete file' });
        }
        res.json({ success: true, message: 'File deleted successfully' });
    });
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});