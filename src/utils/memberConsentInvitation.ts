import type { LanguageCode } from '../i18n/translations';

// Ein geteilter Link ist keine Einwilligung und enthält keine Mitgliedsdaten.
export const MEMBER_EMAIL_CONSENT_URL = 'https://academy.gomo-marketing.at/?emailConsent=1#email-consent';
export const memberConsentDestination = (search: string): 'profile' | 'dashboard' =>
  new URLSearchParams(search).get('emailConsent') === '1' ? 'profile' : 'dashboard';

export const memberConsentInvitationCopy: Record<LanguageCode, {
  title: string; description: string; link: string; copyLink: string; copyMessage: string;
  copied: string; copyFailed: string; message: string;
}> = {
  de: {
    title: 'Einwilligung nachträglich einholen',
    description: 'Gib diesen Link persönlich weiter, zum Beispiel im Gespräch oder über einen bereits vereinbarten Kontaktweg. Das Mitglied meldet sich an und entscheidet im eigenen Profil. Erst nach der E-Mail-Bestätigung wird die Einwilligung aktiv. Hier wird keine E-Mail versendet.',
    link: 'Link zur eigenen E-Mail-Einstellung', copyLink: 'Anmeldelink kopieren', copyMessage: 'Einladungstext kopieren',
    copied: 'Kopiert. Du kannst den Inhalt jetzt persönlich weitergeben.',
    copyFailed: 'Kopieren nicht möglich. Bitte den Link oder Text im Feld markieren und manuell kopieren.',
    message: `Hallo! Wenn du Academy-Neuigkeiten, hilfreiche Tipps und Angebote per E-Mail erhalten möchtest, kannst du dich hier in deinem Academy-Konto anmelden und unter „Marketing-E-Mails“ freiwillig zustimmen:\n\n${MEMBER_EMAIL_CONSENT_URL}\n\nBestätige anschließend die E-Mail. Du kannst deine Einwilligung jederzeit widerrufen. Deine Mitgliedschaft bleibt auch ohne Anmeldung unverändert.\n\nLiebe Grüße\nStefan, Betreiber der GOM-MAR Academy`,
  },
  en: {
    title: 'Request consent later',
    description: 'Share this link personally, for example in a conversation or through an agreed contact channel. The member signs in and decides in their own profile. Consent becomes active only after email confirmation. No email is sent here.',
    link: 'Link to your email settings', copyLink: 'Copy signup link', copyMessage: 'Copy invitation text',
    copied: 'Copied. You can now share the content personally.',
    copyFailed: 'Could not copy. Select the link or text in the field and copy it manually.',
    message: `Hello! If you would like to receive Academy news, helpful tips and offers by email, sign in to your Academy account here and opt in voluntarily under “Marketing emails”:\n\n${MEMBER_EMAIL_CONSENT_URL}\n\nThen confirm the email. You can withdraw consent at any time. Your membership stays the same even if you do not subscribe.\n\nBest wishes\nStefan, operator of GOM-MAR Academy`,
  },
  pl: {
    title: 'Poproś o zgodę później',
    description: 'Przekaż ten link osobiście, na przykład podczas rozmowy lub przez uzgodniony kanał kontaktu. Użytkownik loguje się i podejmuje decyzję we własnym profilu. Zgoda staje się aktywna dopiero po potwierdzeniu e-maila. Tutaj nie jest wysyłany żaden e-mail.',
    link: 'Link do własnych ustawień e-mail', copyLink: 'Kopiuj link zapisu', copyMessage: 'Kopiuj treść zaproszenia',
    copied: 'Skopiowano. Możesz teraz osobiście przekazać treść.',
    copyFailed: 'Nie udało się skopiować. Zaznacz link lub tekst w polu i skopiuj go ręcznie.',
    message: `Cześć! Jeśli chcesz otrzymywać aktualności Academy, pomocne wskazówki i oferty e-mailem, zaloguj się tutaj na swoje konto Academy i dobrowolnie wyraź zgodę w sekcji „Marketing-E-Mails” (e-maile marketingowe):\n\n${MEMBER_EMAIL_CONSENT_URL}\n\nNastępnie potwierdź e-mail. Możesz w każdej chwili wycofać zgodę. Twoje członkostwo nie zmieni się, jeśli się nie zapiszesz.\n\nPozdrawiam\nStefan, prowadzący GOM-MAR Academy`,
  },
};
