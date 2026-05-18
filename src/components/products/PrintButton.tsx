'use client';

import { FileText } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-110 transition-all"
    >
      <FileText size={14} />
      Print / Save PDF
    </button>
  );
}
