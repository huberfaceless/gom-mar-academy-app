type EmailLanguage = 'de' | 'en' | 'pl';

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const emailFrame = (title: string, content: string, footer: string, language: EmailLanguage = 'de') => `<!doctype html>
<html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f1f5f9;color:#0f172a;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:30px;background:#ffffff;border:1px solid #cbd5e1;border-radius:18px">
<p style="font-size:14px;font-weight:700;color:#4f46e5">GOM-MAR Academy</p>
<h1 style="font-size:24px;line-height:1.3">${escapeHtml(title)}</h1>
${content}
<p style="margin-top:32px;padding-top:16px;border-top:1px solid #cbd5e1;color:#64748b;font-size:13px;line-height:1.5">${escapeHtml(footer)}</p>
</div></body></html>`;

export const renderTextEmailHtml = (subject: string, body: string) => emailFrame(
  subject,
  `<div style="white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.7">${escapeHtml(body)}</div>`,
  'GOM-MAR Academy',
);

export const renderConsentEmailHtml = (
  language: EmailLanguage,
  subject: string,
  confirmationUrl: string,
) => {
  const copy = {
    de: { intro: 'Du hast E-Mails mit Academy-Neuigkeiten, Tipps und Angeboten angefordert.', button: 'Einwilligung bestätigen', note: 'Bitte bestätige deine Anmeldung innerhalb von 24 Stunden. Erst nach deiner Bestätigung wird die Einwilligung aktiv.', footer: 'Falls du die Anmeldung nicht selbst angefordert hast, ignoriere diese E-Mail.' },
    en: { intro: 'You requested emails with Academy news, tips and offers.', button: 'Confirm consent', note: 'Please confirm your subscription within 24 hours. Your consent becomes active only after confirmation.', footer: 'If you did not request this, ignore this email.' },
    pl: { intro: 'Poproszono o e-maile z aktualnościami Academy, wskazówkami i ofertami.', button: 'Potwierdź zgodę', note: 'Potwierdź zapis w ciągu 24 godzin. Zgoda zacznie obowiązywać dopiero po potwierdzeniu.', footer: 'Jeśli to nie Twoja prośba, zignoruj tę wiadomość.' },
  }[language];
  const safeUrl = escapeHtml(confirmationUrl);
  return emailFrame(subject, `<p style="line-height:1.6">${copy.intro}</p>
<p style="line-height:1.6">${copy.note}</p>
<p><a href="${safeUrl}" style="display:inline-block;padding:14px 22px;border-radius:10px;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700">${copy.button}</a></p>
<p style="font-size:13px;line-height:1.5;overflow-wrap:anywhere"><a href="${safeUrl}">${safeUrl}</a></p>`, copy.footer, language);
};

export const accountVerificationEmailCopy = (language: EmailLanguage, link: string) => {
  const copy = {
    de: { subject: 'Bestätige deine E-Mail-Adresse für die GOM-MAR Academy', intro: 'Du hast ein Konto bei der GOM-MAR Academy erstellt.', instruction: 'Bitte bestätige deine E-Mail-Adresse über diesen Link:', button: 'E-Mail-Adresse bestätigen', footer: 'Falls du kein Konto erstellt hast, ignoriere diese Nachricht.' },
    en: { subject: 'Verify your email address for GOM-MAR Academy', intro: 'You created an account with GOM-MAR Academy.', instruction: 'Please verify your email address using this link:', button: 'Verify email address', footer: 'If you did not create an account, ignore this email.' },
    pl: { subject: 'Potwierdź adres e-mail w GOM-MAR Academy', intro: 'Utworzono konto w GOM-MAR Academy.', instruction: 'Potwierdź swój adres e-mail za pomocą tego linku:', button: 'Potwierdź adres e-mail', footer: 'Jeśli nie utworzono konta, zignoruj tę wiadomość.' },
  }[language];
  return {
    subject: copy.subject,
    text: `${copy.intro}\n\n${copy.instruction}\n${link}\n\n${copy.footer}`,
    html: emailFrame(copy.subject, `<p style="line-height:1.6">${copy.intro}</p>
<p style="line-height:1.6">${copy.instruction}</p>
<p><a href="${escapeHtml(link)}" style="display:inline-block;padding:14px 22px;border-radius:10px;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700">${copy.button}</a></p>
<p style="font-size:13px;line-height:1.5;overflow-wrap:anywhere"><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>`, copy.footer, language),
  };
};

export const passwordResetEmailCopy = (language: EmailLanguage, link: string) => {
  const copy = {
    de: { subject: 'Setze dein Passwort für die GOM-MAR Academy zurück', intro: 'Für dein Academy-Konto wurde ein neues Passwort angefordert.', button: 'Passwort zurücksetzen', footer: 'Falls du das nicht selbst angefordert hast, ignoriere diese E-Mail. Dein Passwort bleibt unverändert.' },
    en: { subject: 'Reset your GOM-MAR Academy password', intro: 'A new password was requested for your Academy account.', button: 'Reset password', footer: 'If you did not request this, ignore this email. Your password will not change.' },
    pl: { subject: 'Zresetuj hasło do GOM-MAR Academy', intro: 'Poproszono o nowe hasło do Twojego konta Academy.', button: 'Zresetuj hasło', footer: 'Jeśli to nie Twoja prośba, zignoruj tę wiadomość. Hasło pozostanie bez zmian.' },
  }[language];
  return {
    subject: copy.subject,
    text: `${copy.intro}\n\n${copy.button}: ${link}\n\n${copy.footer}`,
    html: emailFrame(copy.subject, `<p style="line-height:1.6">${copy.intro}</p>
<p><a href="${escapeHtml(link)}" style="display:inline-block;padding:14px 22px;border-radius:10px;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:700">${copy.button}</a></p>
<p style="font-size:13px;line-height:1.5;overflow-wrap:anywhere"><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>`, copy.footer, language),
  };
};
