export default function DateRangeFilter({ startDate, endDate, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => onChange({ startDate: e.target.value || null, endDate })}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
        <input
          type="date"
          value={endDate || ''}
          onChange={(e) => onChange({ startDate, endDate: e.target.value || null })}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>
      {(startDate || endDate) && (
        <button
          onClick={() => onChange({ startDate: null, endDate: null })}
          className="mt-5 text-xs text-gray-400 hover:text-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}
