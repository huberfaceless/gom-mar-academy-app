import { useEffect, useState } from 'react';
import { loadProContract, type ProContract } from '../services/stripePaymentService';

// Only server-confirmed amounts are displayed. Refresh background tabs on return.
export function useProContract() {
  const [contract, setContract] = useState<ProContract | null>(null);
  useEffect(() => {
    let cancelled = false;
    const refresh = () => void loadProContract().then(value => {
      if (cancelled || !value.offer) return;
      setContract(current => current?.offer?.introductory === false && value.offer.introductory ? current : value);
    }).catch(() => { /* Checkout remains unavailable until confirmed server data exists. */ });
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    window.addEventListener('focus', refresh);
    return () => { cancelled = true; window.clearInterval(interval); window.removeEventListener('focus', refresh); };
  }, []);
  return contract;
}
