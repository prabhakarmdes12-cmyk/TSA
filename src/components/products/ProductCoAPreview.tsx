'use client';

import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, ExternalLink, MessageCircle } from 'lucide-react';
import { getCoA } from '@/data/productMeta';
import type { Product } from '@/data/products';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export function ProductCoAPreview({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const locale = useLocale();
  const hasCoa = getCoA(product).length > 0;

  return (
    <div className="glass rounded-xl p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]"
      >
        <span className="flex items-center gap-2">
          <FileText size={14} />
          Certificate of Analysis (COA)
        </span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div className="mt-3">
          {hasCoa ? (
            <div className="flex items-start gap-3 mt-2 p-4 rounded-xl bg-[rgba(191,111,0,0.05)] border border-[rgba(191,111,0,0.1)]">
              <FileText size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed font-medium">
                  Certificate of Analysis available for {product.name}.
                </p>
                <p className="text-[10px] text-[var(--color-muted)] mt-1">
                  Batch-specific test results with full parameter specifications.
                </p>
                <Link
                  href={`/${locale}/coa/${product.id}`}
                  className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-[var(--color-primary)] hover:brightness-110 transition-all"
                >
                  <ExternalLink size={12} />
                  View Full COA
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 mt-2 p-4 rounded-xl bg-[rgba(191,111,0,0.05)] border border-[rgba(191,111,0,0.1)]">
              <MessageCircle size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  Certificate of Analysis available on request — contact us for batch-specific documentation.
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-[var(--color-primary)] hover:brightness-110 transition-all"
                >
                  Request COA
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
