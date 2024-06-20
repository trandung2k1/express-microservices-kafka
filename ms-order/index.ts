import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
const portOrder = process.env.PORT_ORDER || 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    return res.send('Order service');
});
app.listen(portOrder, () => {
    console.log(`Server listening on http://localhost:${portOrder}`);
});
