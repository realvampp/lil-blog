import * as dotenv from 'dotenv';

dotenv.config();

export const getConfig = () => {
  const { env } = process;

  return {
    env: env.NODE_ENV,
    port: env.PORT || 3000,
    databases: {
      mysql: {
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE,
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
      },
    },
    jwt: {
      accessTokenSecret: env.JWT_ACCESS_TOKEN_SECRET,
      accessTokenExpiration: env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      refreshTokenSecret: env.JWT_REFRESH_TOKEN_SECRET,
      refreshTokenExpiration: env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    },
  };
};
