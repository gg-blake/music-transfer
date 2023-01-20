// This is the server file for the music player. It is a node.js server that uses the ffprobe command to get the metadata of all the files in a directory and then serves that data to the client.
// This server is designed to be run on a raspberry pi, running Ubuntu Server 20.04 LTS.

var express = require("express");
const { exec , execSync } = require("child_process");
var app = express();
const { promisify } = require('util');
const { resolve } = require('path');const fs = require('fs');
const { json } = require("body-parser");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);


let jsonList = [];let ignoreFiles = [];let lastScanTime = Date.now();

async function getFiles(dir) {
    const subdirs = await readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;  
    }));  
    return files.reduce((a, f) => a.concat(f), []);
}

async function cacheJson(dir) {
    if (ignoreFiles.includes(dir)) {
        return
    }
    let response = await execSync(`ffprobe -v quiet -print_format json -show_format -show_streams '${dir}'>`);
    let json = JSON.parse(response.toString());
    json['date_added'] = Date.now();
    jsonList.push(json);
}

async function loadAllJSON(dir) {
    getFiles(dir)    .then(files => {
        files.map(file => {            cacheJson(file)
            .catch((error) => {
                ignoreFiles.push(file);
            })
        })
    })
    .then(() => {        lastScanTime = Date.now();    })
    .catch((error) => {
        console.log(error)
    })
}

function scanFiles(dir) {
    let names = jsonList.map(file => file.format.filename);
    getFiles(dir)
    .then(files => {
        files.map(file => {
            if (!names.includes(file)) {
                console.log(`New file found: ${file}`);
                cacheJson(file);
            }
        })
    })
    .then(() => {
        getFiles(dir)
        .then(files => {
            jsonList.map((file, index) => {
                if (!files.includes(file.format.filename)) {
                    console.log(`File removed: ${file.format.filename}`);
                    jsonList.splice(index, 1);
                }
            })
        })
        
        

    })
    .catch((error) => {
        console.log("")
    })
}

app.use("/api/files", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json({data: jsonList});
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
    loadAllJSON("/home/music")
    .then(() => {
        setInterval(() => {
            scanFiles("/home/music")
        }, 60000);
    });
});