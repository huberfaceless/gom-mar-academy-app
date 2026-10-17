import React, { cloneElement, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

interface SidebarTooltipProps {
  label: string;
  enabled: boolean;
  children: React.ReactElement<{ 'aria-describedby'?: string }>;
}

// Render outside the scrolling sidebar so its overflow cannot cut off the label.
export const SidebarTooltip: React.FC<SidebarTooltipProps> = ({ label, enabled, children }) => {
  const id = useId();
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const visible = enabled && position !== null;
  const close = () => setPosition(null);
  const show = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ left: rect.right + 10, top: Math.max(32, Math.min(window.innerHeight - 32, rect.top + rect.height / 2)) });
  };
  useEffect(() => {
    if (!visible) return;
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [visible]);

  return (
    <div className="w-full" onMouseEnter={show} onMouseLeave={close} onFocus={show} onBlur={close}
      onClick={close} onKeyDown={event => { if (event.key === 'Escape') close(); }}>
      {cloneElement(children, { 'aria-describedby': visible ? id : undefined })}
      {visible && createPortal(
        <div id={id} role="tooltip" className="pointer-events-none fixed z-[100] -translate-y-1/2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-lg break-words"
          style={{ left: position.left, top: position.top, maxWidth: `min(18rem, calc(100vw - ${position.left + 12}px))` }}>
          <span aria-hidden="true" className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-900" />
          {label}
        </div>, document.body,
      )}
    </div>
  );
};
