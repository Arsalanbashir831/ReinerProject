const express = require('express');
const db = require('./DB_Connection'); 
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// fetching the partners from database
app.get('/partners',(req,res)=>{
const sql = "SELECT locations.name, locations.type ,locations.opening_hours,locations.tel,locations.google_maps_url, sites.url FROM locations INNER JOIN sites ON locations.site_id = sites.id WHERE locations.type = 'Partner'";
db.query(sql,(err,result)=>{
    if(err){
        return res.status(500).json({error:err.message})
    }
    res.json(result);
})
})

// fetching the drop down location from the database
app.get('/dropLocation/:region', (req, res) => {
    const region = req.params.region;
    const sql = 'SELECT * FROM drop_off_locations WHERE region = ?';
    
    db.query(sql, [region], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});


//fetching the region from the database
app.get('/region', (req, res) => {
   
    const sql = "SELECT DISTINCT region FROM drop_off_locations WHERE region <> '';"
    
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});


// Define the port number
const PORT =3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
