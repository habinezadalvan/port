import {createLogger, transports, format} from 'winston';

const logger = createLogger({
    transports: [
        new transports.File({filename: './src/logs/error.log', level: 'error'}),
        new transports.File({filename: './src/logs/combined.log'})
    ],
    exceptionHandlers: [
        new transports.File({filename: './src/logs/exceptions.log'})
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple()
    }));
  }

export default logger;
