const express = require('express');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const dataSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const pointRouter = require('./routes/pointRouter');
const activityRouter = require('./routes/activityRouter');
const rewardRouter = require('./routes/rewardRouter');
const regionRouter = require('./routes/regionRouter');
const voucherRouter = require('./routes/voucherRouter');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');
const { imageErrorHandler } = require('./controllers/imageController');

dotenv.config({ path: `${__dirname}/.env` });
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
app.use('/api/v1/rewards', rewardRouter);
app.use('/api/v1/regions', regionRouter);
app.use('/api/v1/vouchers', voucherRouter);

app.use(imageErrorHandler);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
