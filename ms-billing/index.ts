import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
const portBilling = process.env.PORT_BILLING || 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    return res.send('Billing service');
});
app.listen(portBilling, () => {
    console.log(`Server listening on http://localhost:${portBilling}`);
});
