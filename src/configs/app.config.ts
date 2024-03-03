export default (): Record<string, unknown> => ({
  PORT: parseInt(process.env.PORT, 10) || 4000,
  apiPrefix: process.env.API_PREFIX,
});
