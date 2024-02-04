import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DISCROD_WEBHOOK_URL: get('DISCROD_WEBHOOK_URL').required().asString(),
}