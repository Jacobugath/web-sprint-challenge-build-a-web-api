const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.listen(5000, ()=>{
    console.log('server is running');
})

module.exports = server;
