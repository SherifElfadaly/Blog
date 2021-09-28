import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  url: process.env.APP_URL || 'http://localhost:3000',
  port: parseInt(process.env.PORT, 10) || parseInt(process.env.APP_PORT, 10) || 3000,
}));
