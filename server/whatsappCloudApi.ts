export type WhatsAppReplyRequest = {
  recipientPhone: string;
  text: string;
  replyToMessageId: string;
};

const GRAPH_API_VERSION = 'v25.0';

export const prepareWhatsAppReply = (
  recipientPhone: unknown,
  text: unknown,
  replyToMessageId: unknown,
): WhatsAppReplyRequest => {
  const normalizedPhone = typeof recipientPhone === 'string' ? recipientPhone.replace(/\D/g, '') : '';
  const normalizedText = typeof text === 'string' ? text.trim() : '';
  const normalizedMessageId = typeof replyToMessageId === 'string' ? replyToMessageId.trim() : '';
  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) throw new Error('Die WhatsApp-Empfängernummer ist ungültig.');
  if (!normalizedText || normalizedText.length > 4096) throw new Error('Die Antwort muss zwischen 1 und 4.096 Zeichen lang sein.');
  if (!normalizedMessageId) throw new Error('Die ursprüngliche WhatsApp-Nachricht fehlt.');
  return { recipientPhone: normalizedPhone, text: normalizedText, replyToMessageId: normalizedMessageId };
};

export const sendWhatsAppReply = async (request: WhatsAppReplyRequest): Promise<{ messageId: string }> => {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  if (!accessToken || !phoneNumberId) throw new Error('Die WhatsApp-Sendeverbindung ist nicht vollständig konfiguriert.');

  const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(phoneNumberId)}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: request.recipientPhone,
      context: { message_id: request.replyToMessageId },
      type: 'text',
      text: { preview_url: false, body: request.text },
    }),
  });
  const payload = await response.json().catch(() => ({})) as {
    messages?: Array<{ id?: string }>;
    error?: { code?: number; message?: string; error_data?: { details?: string } };
  };
  const messageId = payload.messages?.[0]?.id;
  if (!response.ok || !messageId) {
    console.error('WhatsApp-Antwort fehlgeschlagen', JSON.stringify({
      status: response.status,
      code: payload.error?.code,
      message: payload.error?.message,
      details: payload.error?.error_data?.details,
    }));
    throw new Error(payload.error?.error_data?.details || payload.error?.message || 'Die WhatsApp-Antwort konnte nicht gesendet werden.');
  }
  return { messageId };
};
