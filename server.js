require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

// App setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Setup auth routes
app.use('/api/auth', authRoutes);

// Everything below requires auth
app.use('/api', ensureAuth);

app.get('/api/items', (req, res) => {

    client.query(`
        SELECT
            id,
            name,
            complete
        FROM items
        WHERE user_id = $1
        ORDER BY name;
    `,
    [req.userId]
    )
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/items', (req, res) => {
    const item = req.body;
    console.log(req);

    client.query(`
        INSERT INTO items (name, user_id)
        VALUES ($1, $2)
        RETURNING *;
    `,
    [item.name, req.userId]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `"${item.name}" is already on the list!`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const item = req.body;

    client.query(`
        UPDATE items
        SET name = $2,
            complete = $3
        WHERE id = $1
        AND user_id = $4
        RETURNING *;
    `,
    [id, item.name, item.complete, req.userId]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `"${item.name}" is already on the list!`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM items
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
    `,
    [id, req.userId]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23503') {
                res.status(400).json({
                    error: `Could not remove, item is in use. Mark complete or delete first.`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});


app.get('/api/test', (req, res) => {
    res.json({
        message: `the user's id is ${req.userId}`
    });
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});