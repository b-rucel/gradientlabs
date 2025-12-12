interface PreviewAreaProps {
  backgroundStyle: {
    background: string
    backgroundSize: string
  }
}

export function PreviewArea({ backgroundStyle }: PreviewAreaProps) {
  return (
    <div className="flex-1 relative bg-gray-200 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Transparency Checkboard BG */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      />

      {/* The Gradient Card */}
      <div
        className="w-full h-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden ring-8 ring-white/40 backdrop-blur-xl transition-all duration-500 ease-out"
        style={backgroundStyle}
      >
        {/* Optional: Add some overlay UI in the preview to show it's "Live" */}
        <div className="absolute bottom-8 left-8 text-white/90 text-sm font-medium px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Live Preview
        </div>
      </div>
    </div>
  )
}
