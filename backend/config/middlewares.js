const express = require('express')
const cors = require('cors')

module.exports = app => {
    app.use(express.json())
    app.use(cors())
}

/* module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
} */