import dotenvSafe from 'dotenv-safe';
import path from 'path';
import fs from 'fs';

const pathEnv = path.join(__dirname, `../../.env`);

if (fs.existsSync(pathEnv)) {
  dotenvSafe.config({
    allowEmptyValues: true,
    path: pathEnv,
    sample: path.join(__dirname, '../../.env.example'),
  });
}
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  aesSecretKey: process.env.AES_SECRET_KEY,
  mongodb: {
    protocol: process.env.MONGODB_PROTOCOL,
    username: process.env.MONGODB_USERNAME,
    pasword: process.env.MONGODB_PASSWORD,
    host: process.env.MONGODB_HOST,
    replicaSet: process.env.MONGODB_REPLICA_SET,
    dbName: process.env.MONGODB_NAME,
  },
  jwtAccessSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET,
};
