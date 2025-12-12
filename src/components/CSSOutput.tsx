interface CSSOutputProps {
  cssCode: string
  copied: boolean
  onCopy: () => void
}

export function CSSOutput({ cssCode, copied, onCopy }: CSSOutputProps) {
  return (
    <section className="space-y-3 pt-4 pb-20">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generate CSS</h2>
      <div className="relative group">
        <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto shadow-inner border border-slate-800 custom-scrollbar">
          {cssCode}
        </div>
        <button
          onClick={onCopy}
          className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </section>
  )
}
