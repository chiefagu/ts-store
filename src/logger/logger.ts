import { createLogger, format, transports } from "winston";

const { printf, errors, timestamp, colorize, combine, json } = format;

const logConfig = {
  console: {
    dev: {
      format: combine(
        colorize(),
        errors({ stack: true }),
        timestamp({ format: "DD-MMM-YY HH:MM:ss" }),
        printf(({ level, stack, timestamp, message }) => {
          return `${level} ${timestamp} ${stack || message}`;
        })
      ),
      handleExceptions: true,
      handleRejections: true,
    },
    prod: {
      format: combine(errors({ stack: true }), timestamp(), json()),
      handleExceptions: true,
      handleRejections: true,
    },
  },
  file: {
    level: "error",
    format: combine(errors({ stack: true }), timestamp(), json()),
    filename: "logs/logfile.log",
    handleExceptions: true,
    handleRejections: true,
  },
};

export function devLogger() {
  const { console, file } = logConfig;
  return createLogger({
    transports: [
      new transports.Console(console.dev),
      new transports.File(file),
    ],
  });
}

export function prodLogger() {
  const { console, file } = logConfig;
  return createLogger({
    transports: [
      new transports.Console(console.prod),
      new transports.File(file),
    ],
  });
}
