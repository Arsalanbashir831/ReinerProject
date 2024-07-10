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
app.get('/partners', (req, res) => {
    const { country, region } = req.query;
    let sql = `SELECT locations.name, locations.type, locations.opening_hours, locations.tel,
                    locations.google_maps_url, sites.url, locations.country, drop_off_locations.region
                FROM locations 
                INNER JOIN sites ON locations.address = sites.id 
                INNER JOIN drop_off_locations ON locations.location = drop_off_locations.nr 
                WHERE locations.type = 'Partner'`;

    if (country) {
        sql += ` AND locations.country = ${db.escape(country)}`;
    }
    if (region) {
        sql += ` AND drop_off_locations.region = ${db.escape(region)}`;
    }

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});


app.get('/regions', (req, res) => {
    const { country } = req.query;

    if (!country) {
        return res.status(400).json({ error: "Country code is required" });
    }

    let sql = `SELECT DISTINCT region FROM drop_off_locations WHERE countryCode = ${db.escape(country)}`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});


// Define the port number
const PORT =3008
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
