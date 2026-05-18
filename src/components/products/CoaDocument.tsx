import type { Product } from '@/data/products';
import type { CoATestEntry } from '@/data/productMeta';

export function CoaDocument({
  product,
  entries,
  locale,
}: {
  product: Product;
  entries: CoATestEntry[];
  locale: string;
}) {
  const certId = product.gcmsBatchId
    ? `COA-${product.gcmsBatchId}`
    : `COA-${product.id.toUpperCase()}-${new Date().getFullYear()}`;

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] py-10 px-4 print:py-0 print:px-0">
      <div
        className="max-w-[210mm] mx-auto bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl print:rounded-none print:shadow-none"
        style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
      >
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-[#BF6F00] via-[#D4AF37] to-[#BF6F00]" />

          <div className="px-10 py-8 print:px-8 print:py-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <img
                  src="/images/logo2.svg"
                  alt="TS Aromatics"
                  className="h-10 w-auto mb-2"
                />
                <p className="text-xs text-gray-500 font-medium tracking-wide">
                  A Legacy of Purity
                </p>
              </div>
              <div className="text-right">
                <h1 className="text-xl font-bold tracking-tight" style={{ color: '#BF6F00' }}>
                  Certificate of Analysis
                </h1>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">
                  Ref: {certId}
                </p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Product</span>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Botanical Name</span>
                  <p className="italic text-gray-700">{product.botanicalName || '—'}</p>
                </div>
                {product.gcmsBatchId && (
                  <>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Batch No.</span>
                      <p className="font-mono text-gray-900">{product.gcmsBatchId}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Category</span>
                      <p className="text-gray-700">{product.category}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Test Table */}
            <table className="w-full text-xs border-collapse mb-6">
              <thead>
                <tr className="border-b-2 border-[#BF6F00]">
                  <th className="text-left py-2 pr-3 font-semibold text-gray-600 uppercase tracking-wider text-[10px]">
                    #
                  </th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-600 uppercase tracking-wider text-[10px]">
                    Parameter
                  </th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-600 uppercase tracking-wider text-[10px]">
                    Specification
                  </th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-600 uppercase tracking-wider text-[10px]">
                    Result
                  </th>
                  <th className="text-left py-2 font-semibold text-gray-600 uppercase tracking-wider text-[10px]">
                    Method
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((row, i) => (
                  <tr key={row.parameter} className="border-b border-gray-100">
                    <td className="py-1.5 pr-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="py-1.5 pr-3 font-medium text-gray-900">{row.parameter}</td>
                    <td className="py-1.5 pr-3 text-gray-600">{row.spec}</td>
                    <td className="py-1.5 pr-3">
                      <span
                        className={
                          row.result === 'Conforms' || row.result === 'Compliant' || row.result === 'Not detected' || row.result.startsWith('<')
                            ? 'text-green-700 font-semibold'
                            : 'text-gray-900'
                        }
                      >
                        {row.result}
                      </span>
                    </td>
                    <td className="py-1.5 text-gray-500">{row.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Date of Release</span>
                <p className="text-sm text-gray-900 font-medium">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Authorized By</span>
                <p className="text-sm text-gray-900 font-medium">Quality Control</p>
                <p className="text-xs text-gray-500">TS Aromatics</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex items-start justify-between text-[10px] text-gray-400">
              <div>
                <p className="font-semibold text-gray-500 mb-1">TS Aromatics</p>
                <p>H.53, Kh-1372, Panchkula-II</p>
                <p>Opp. Anand Hospital, Chapraulla</p>
                <p>Greater Noida — 201009</p>
              </div>
              <div className="text-right">
                <p>Verify at: www.tsaromatics.in/verify</p>
                <p className="mt-1 italic">
                  This certificate is computer-generated and does not require a physical signature.
                </p>
              </div>
            </div>
          </div>

          <div className="h-2 bg-gradient-to-r from-[#BF6F00] via-[#D4AF37] to-[#BF6F00]" />
        </div>
      </div>
    </div>
  );
}
