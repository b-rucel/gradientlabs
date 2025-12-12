interface SidebarHeaderProps {
  isDownloading: boolean
  onDownload: () => void
  onRandomize: () => void
}

export function SidebarHeader({ isDownloading, onDownload, onRandomize }: SidebarHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 space-y-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
          <span className="text-2xl">✨</span> Gradient Labs
        </h1>
        <p className="text-sm text-gray-500 mt-1 pl-9">Craft beautiful gradients & patterns</p>
      </div>

      {/* Actions Toolbar */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download PNG</span>
            </>
          )}
        </button>

        <button
          onClick={onRandomize}
          className="flex-1 py-2 px-3 bg-white border border-gray-200 hover:border-blue-300 text-gray-600 font-semibold rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-xs shadow-sm"
        >
          <span>🎲</span> Randomize
        </button>
      </div>
    </div>
  )
}
