const client = require('./db');

const app = require('./server');

app.get('/', (req, res) => {
    client.query("select * from popup", (err, res2) => {
        if(err){
            throw err
        }
        res.status(200).json(res2.rows);
    })
});

app.post('/', async (req, res) => {
    console.log(req.body);
    const query = `
    insert into popup(name, coordi, addresstype) 
    values($1, st_point($2, $3), $4) RETURNING *
    `
    client.query(query, 
    [req.body.name, req.body.coordi1, req.body.coordi2, req.body.addressType],
    (err, res2) => {
        if (err) {
            throw err
        }
        res.status(201).json(res2.rows)
    })
});