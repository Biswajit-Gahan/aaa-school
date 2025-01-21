const SERVER_ENVIRONMENT = process.env.NEXT_PUBLIC_SERVER_ENV || 'prod';

const showEncryptedData = SERVER_ENVIRONMENT === "prod";
const isProductionServer = SERVER_ENVIRONMENT === "prod";
const isUatServer = SERVER_ENVIRONMENT === "uat";
const isDevSever = SERVER_ENVIRONMENT === "dev";

export {showEncryptedData, isProductionServer, isUatServer, isDevSever};