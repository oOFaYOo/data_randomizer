import express from'express';
import bodyParser from'body-parser';
import cookieParser from"cookie-parser";
import path from'path';
import generateUsers from"./generator.mjs";
import { mkConfig, generateCsv, asString } from"export-to-csv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const {seed, page, errors, region} = req.query;
    const users = generateUsers(+seed, +page, +errors, region);
    res.send(users);}
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.get('/api/data/csv', async (req, res) => {
    try{
        const {seed, page, errors, region} = req.query;
        let users = [];
        for (let i = 0; i <= +page; i++) {
           users = [...users, ...generateUsers(+seed, i, +errors, region)] 
        }
        const csvConfig = mkConfig({ useKeysAsHeaders: true });
        const csv = generateCsv(csvConfig)(users);
        res.send(asString(csv));
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

export default app;