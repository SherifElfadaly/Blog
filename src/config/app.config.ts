import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  url: parseInt(process.env.APP_URL, 10) || 'http://localhost:3000',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
}));
