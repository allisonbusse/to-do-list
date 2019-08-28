const client = require('../lib/client.js');

client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(256) NOT NULL,
            hash VARCHAR(512) NOT NULL,
            display_name VARCHAR(256) NOT NULL
        );
        
        CREATE TABLE items (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(256) NOT NULL UNIQUE,
            complete BOOLEAN NOT NULL DEFAULT FALSE
        );
        `)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });