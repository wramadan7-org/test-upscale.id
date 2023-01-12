require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routeV1 = require('./routes/index');

const app = express();

const { NODE_PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use('/v1', routeV1);

app.listen(NODE_PORT, () => {
  console.log(`App listen on port ${NODE_PORT}`);
});
