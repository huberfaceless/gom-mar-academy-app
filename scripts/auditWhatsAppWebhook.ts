import { createHmac } from 'crypto';
import assert from 'node:assert/strict';
import {
  summarizeWhatsAppWebhook,
  verifyWhatsAppWebhookChallenge,
  verifyWhatsAppWebhookSignature,
} from '../server/whatsappWebhook.js';

const token = 'test-verification-token';
assert.equal(verifyWhatsAppWebhookChallenge({
  'hub.mode': 'subscribe',
  'hub.verify_token': token,
  'hub.challenge': '123456',
}, token), '123456');
assert.equal(verifyWhatsAppWebhookChallenge({
  'hub.mode': 'subscribe',
  'hub.verify_token': 'wrong-token',
  'hub.challenge': '123456',
}, token), null);

const rawBody = Buffer.from(JSON.stringify({ object: 'whatsapp_business_account' }));
const appSecret = 'test-app-secret';
const signature = `sha256=${createHmac('sha256', appSecret).update(rawBody).digest('hex')}`;
assert.equal(verifyWhatsAppWebhookSignature(rawBody, signature, appSecret), true);
assert.equal(verifyWhatsAppWebhookSignature(Buffer.from('{}'), signature, appSecret), false);
assert.equal(verifyWhatsAppWebhookSignature(rawBody, 'sha256=invalid', appSecret), false);

assert.deepEqual(summarizeWhatsAppWebhook({
  object: 'whatsapp_business_account',
  entry: [{
    id: 'business-id',
    changes: [{
      field: 'messages',
      value: { messages: [{ id: 'message-id' }], statuses: [{ id: 'status-id' }] },
    }],
  }],
}), {
  object: 'whatsapp_business_account',
  entryCount: 1,
  messageCount: 1,
  statusCount: 1,
  fields: ['messages'],
});

console.log('WhatsApp-Webhook-Audit erfolgreich.');
