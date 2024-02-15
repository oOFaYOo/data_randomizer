const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const {base, fr, ru, ja, Faker} = require('@faker-js/faker');
const { xoroshiro128plus } = require('pure-rand');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../build')))

app.get('/api/data', async (req, res) => {
    try{
    const {seed, page, error, region} = req.query;
    const users = generateUsers(+seed, page, error, region);
    res.send(users);}
    catch (e){
        console.log(e);
        res.status(500);
        res.send(e.message);
    }
});

function generatePureRandRandomizer(seed, factory = xoroshiro128plus) {
    const self = {
        next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000, seed: (seed) => {
            self.generator = factory(typeof seed === 'number' ? seed : seed[0]);
        },
    }
    self.seed(seed);
    return self;
}

function generateUsers(seed, page, errors, region) {
    let faker;
    let randomizer = generatePureRandRandomizer(seed);
    randomizer.seed(seed + region);
    switch (region) {
        case 'usa':
            faker = new Faker({locale: [fr, base], randomizer: randomizer});
            break;
        case 'russia':
            faker = new Faker({locale: [ru, base], randomizer: randomizer});
            break;
        case 'japan':
            faker = new Faker({locale: [ja, base], randomizer: randomizer});
            break;
        default:
            throw new Error(`Unknown region '${region}'`);
    }

    let users = [];
    const count = page === 0 ? 20 : 10;
    for (let i = 0; i < count; i++) {
        users.push({
            number: 20 * page + i,
            id: 'asdasd',
            name: faker.person.firstName(),
            address: faker.location.city(),
            phone: faker.phone.number()
        });
    }
    return users;
}


app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

module.exports = app;