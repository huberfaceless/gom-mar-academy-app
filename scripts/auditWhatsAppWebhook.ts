import { createHmac } from 'crypto';
import assert from 'node:assert/strict';
import {
  extractWhatsAppDeliveryStatuses,
  extractWhatsAppInboundMessages,
  summarizeWhatsAppWebhook,
  verifyWhatsAppWebhookChallenge,
  verifyWhatsAppWebhookSignature,
} from '../server/whatsappWebhook.js';
import { normalizeWhatsAppPhone } from '../server/whatsappMemberProfileAdmin.js';

assert.equal(normalizeWhatsAppPhone('+43 660 1234567'), '+436601234567');
assert.equal(normalizeWhatsAppPhone('0048 600 123 456'), '+48600123456');
assert.equal(normalizeWhatsAppPhone(''), '');
assert.throws(() => normalizeWhatsAppPhone('0660 1234567'), /Ländervorwahl/);
assert.throws(() => normalizeWhatsAppPhone('+43 12'), /gültige Telefonnummer/);

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


const recipientId = '436604805584';
const deliveryStatuses = extractWhatsAppDeliveryStatuses({
  object: 'whatsapp_business_account',
  entry: [{
    changes: [{
      field: 'messages',
      value: {
        statuses: [{
          id: 'wamid.test',
          status: 'failed',
          timestamp: '1789981200',
          recipient_id: recipientId,
          conversation: { origin: { type: 'marketing' } },
          pricing: { billable: false, category: 'marketing' },
          errors: [{
            code: 131049,
            title: 'This message was not delivered',
            message: 'This message was not delivered',
            error_data: { details: 'Message not delivered to maintain healthy ecosystem engagement.' },
          }],
        }],
      },
    }],
  }],
});

assert.deepEqual(deliveryStatuses, [{
  messageId: 'wamid.test',
  status: 'failed',
  timestamp: '1789981200',
  conversationOriginType: 'marketing',
  pricingCategory: 'marketing',
  billable: false,
  errors: [{
    code: 131049,
    title: 'This message was not delivered',
    message: 'This message was not delivered',
    details: 'Message not delivered to maintain healthy ecosystem engagement.',
  }],
}]);
assert.equal(JSON.stringify(deliveryStatuses).includes(recipientId), false);
assert.equal(JSON.stringify(deliveryStatuses).includes('recipient_id'), false);

const inboundMessages = extractWhatsAppInboundMessages({
  object: 'whatsapp_business_account',
  entry: [{
    changes: [{
      field: 'messages',
      value: {
        contacts: [{ wa_id: '436601234567', profile: { name: 'Test Kontakt' } }],
        messages: [{
          id: 'wamid.inbound-test',
          from: '436601234567',
          timestamp: '1790266850',
          type: 'text',
          text: { body: 'Hallo Academy' },
        }],
      },
    }],
  }],
});

assert.deepEqual(inboundMessages, [{
  messageId: 'wamid.inbound-test',
  senderPhone: '436601234567',
  senderName: 'Test Kontakt',
  timestamp: '1790266850',
  type: 'text',
  text: 'Hallo Academy',
}]);
assert.equal(JSON.stringify(inboundMessages).includes('profile'), false);
assert.equal(JSON.stringify(inboundMessages).includes('metadata'), false);

console.log('WhatsApp-Webhook-Audit erfolgreich.');
