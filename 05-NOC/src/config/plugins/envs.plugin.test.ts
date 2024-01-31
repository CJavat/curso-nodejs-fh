import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    
    expect( envs ).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'carmegamanx5@gmail.com',
      MAILER_SECRET_KEY: 'yjnwvoiovcgzklhi',
      PROD: false,
      MONGO_URL: 'mongodb://cjavatx:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'cjavatx',
      MONGO_PASS: '123456',
      POSTGRES_URL: 'postgresql://postgres:123456@localhost:5433/NOC',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: '123456'
    })

  });

  test('should return error if not found env', async () => {
    
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect( true ).toBe( false );

      } catch (error) {
        expect(`${ error }`).toContain('"PORT" should be a valid integer');
    }

      

  });
});