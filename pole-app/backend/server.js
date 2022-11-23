const express = require('express');

const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
})

app.get('/api', (req, res, next) => {
    res.json({
       message: 'Hello3 '
   });
/*     next();
    }, (req, res, next) => {
        res.json({
           message: 'Hello 2 '
        });
       console.log('2');
       res.send('world');
*/ });