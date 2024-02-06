const express = require('express')
const app = express();
const port = 10000;

app.get("/", (req, res) =>{
	res.send('uwu')
})

app.listen(port, () => {
    console.log(`Listening ${port}`);
});