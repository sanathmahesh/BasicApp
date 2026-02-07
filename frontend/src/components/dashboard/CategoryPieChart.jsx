import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getCategoryColor, getCategoryConfig } from '../../utils/categoryConfig';

export default function CategoryPieChart({ data }) {
  if (!data || !data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Category Breakdown</h3>
        <p className="text-gray-400 text-sm text-center py-8">No expenses this month</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: getCategoryConfig(item.category).label,
    value: Number(item.total),
    color: getCategoryColor(item.category),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
