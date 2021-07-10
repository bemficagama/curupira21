const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Saudações Mundo Maravilhoso ...')
})

app.listen(port, () => {
    console.log(`Exemplo de app escutando em http://localhost:${port}`)
})