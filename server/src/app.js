const express = require('express');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const dataSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const pointRouter = require('./routes/pointRouter');
const activityRouter = require('./routes/activityRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');
const { imageErrorHandler } = require('./controllers/imageController');
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors());
app.use(cookieParser());
app.use(express.static(`${__dirname}/../../public`));
app.use(dataSanitize());
app.use(xss());
app.use(hpp());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/points', pointRouter);
app.use('/api/v1/actvities', activityRouter);

app.use(imageErrorHandler);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

`
{
  "name": "TEST POINT",
  "address": "test address",
  "photo": "TEST STRING",
  "availableTickets": 15,
  "agent": "64ce50d0cc60fcb1092437b3",
  "qrcode": "qrcode"
}
`;
