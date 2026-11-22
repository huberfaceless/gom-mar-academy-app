import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MEMBER_EMAIL_CONSENT_URL, memberConsentInvitationCopy } from '../utils/memberConsentInvitation';

export function MemberConsentInvitation() {
  const { language } = useLanguage();
  const copy = memberConsentInvitationCopy[language];
  const [result, setResult] = useState<'copied' | 'copyFailed' | null>(null);
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setResult('copied');
    } catch { setResult('copyFailed'); }
  };
  return (
    <div className="space-y-3 border-t border-slate-800 pt-3">
      <h5 className="text-sm font-bold text-white">{copy.title}</h5>
      <p className="text-xs leading-relaxed text-slate-400">{copy.description}</p>
      <label className="block text-xs text-slate-300">
        {copy.link}
        <input readOnly value={MEMBER_EMAIL_CONSENT_URL} onFocus={(event) => event.currentTarget.select()} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white" />
      </label>
      <button type="button" onClick={() => void copyText(MEMBER_EMAIL_CONSENT_URL)} className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500">{copy.copyLink}</button>
      <textarea aria-label={copy.copyMessage} readOnly value={copy.message} rows={7} onFocus={(event) => event.currentTarget.select()} className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white" />
      <button type="button" onClick={() => void copyText(copy.message)} className="rounded-lg border border-indigo-400 px-3 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900">{copy.copyMessage}</button>
      {result && <p role="status" className="text-xs text-slate-300">{copy[result]}</p>}
    </div>
  );
}
