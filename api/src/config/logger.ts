import pino from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
    colorize: true,
    ignore: 'pid,hostname',
    levelFirst: true,
    minimumLevel: 'debug'
})

export const logger = pino(stream)
