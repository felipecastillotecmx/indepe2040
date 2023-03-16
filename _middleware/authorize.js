const { expressjwt: jwt } = require('express-jwt');
const winston = require('winston');
const jwt_decode = require('jwt-decode');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};
const logger = winston.createLogger(logConfiguration);

module.exports = authorize;

function authorize() {
    return [
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const decoded = jwt_decode(token);

            logger.info(decoded.sub);
            const user = await db.User.findByPk(decoded.sub);

            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            req.user = user.get();
            next();
        }
    ];
}
