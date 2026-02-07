import { CATEGORIES } from '../../constants/categories';

export default function CategoryFilter({ selectedCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
          !selectedCategory
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            selectedCategory === cat.value
              ? 'text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          style={selectedCategory === cat.value ? { backgroundColor: cat.color } : {}}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
