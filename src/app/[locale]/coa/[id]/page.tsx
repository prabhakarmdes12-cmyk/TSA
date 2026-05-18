import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { getCoA } from '@/data/productMeta';
import { CoaDocument } from '@/components/products/CoaDocument';
import { PrintButton } from '@/components/products/PrintButton';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CoaPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();

  const entries = getCoA(product);
  const hasCoa = entries.length > 0;

  return (
    <div>
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[var(--color-bg-base)]/90 backdrop-blur-md border-b border-[var(--color-border)] print:hidden">
        <Link
          href={`/${locale}/products/${product.id}`}
          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
        >
          &larr; Back to {product.name}
        </Link>
        <PrintButton />
      </div>

      {hasCoa ? (
        <CoaDocument product={product} entries={entries} locale={locale} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-base)] px-4">
          <div className="max-w-md text-center">
            <FileText size={48} className="mx-auto mb-4 text-[var(--color-muted)]" />
            <h1 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
              Certificate of Analysis
            </h1>
            <p className="text-sm text-[var(--color-muted)] mb-6">
              Certificate of Analysis for {product.name} is available on request — contact us for batch-specific documentation.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={`/${locale}/contact`}
                className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:brightness-110 transition-all"
              >
                Request COA
              </Link>
              <Link
                href={`/${locale}/products/${product.id}`}
                className="px-6 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-main)] hover:border-[var(--color-primary)] transition-all"
              >
                Back to Product
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
