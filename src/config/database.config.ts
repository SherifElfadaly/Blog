import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  seeds: ['dist/**/seeders/*.js'],
  factories: ['dist/**/factories/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
}));
