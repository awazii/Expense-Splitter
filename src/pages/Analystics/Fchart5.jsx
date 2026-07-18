import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts";
import { CategoryExtrator } from "../../utils/CategoryExtractor";
import { useSelector } from "react-redux";
import { selectAllGroups } from "../../store/GroupSlice";
import { UniversalEmptyState } from "../../Components/UniversalEmptyState";
import { RiBarChart2Line } from "react-icons/ri";
const GroupExpensesChart = () => {
  const GroupData = useSelector(selectAllGroups).filter(g => g.totalAmount > 0).map(g => (
    {
      name: g.Name,
      icon: CategoryExtrator(g).Img,
      Spendings: g.totalAmount
    }

  )
  )

  const sortedData = [...GroupData].sort((a, b) => b.Spendings - a.Spendings).slice(0, 4);
  return (
    <>
      {sortedData.length > 0 ? <ResponsiveContainer width={"100%"} height={220}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            tick={({ x, y, payload }) => {
              const entry = sortedData.find(item => item.name === payload.value);
              const logo = entry?.icon;
              return (
                <foreignObject x={x - 50} y={y - 20} width={50} height={50}>
                  <img
                    src={logo}
                    alt={payload.value}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </foreignObject>
              );
            }}
            hide={sortedData.length > 10}
          />
          <Tooltip formatter={(value) => `Rs.${Number(value).toLocaleString()}`}
            cursor={{ fill: "#E8F5E9", radius: 8 }}
            labelStyle={{
              color: "#374151",
              fontWeight: "600",
            }}
            itemStyle={{
              color: "#111827",
              fontWeight: "500",
            }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="Spendings" fill="#4CAF50" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer> : <UniversalEmptyState
        title="No data available."
      >
        <div className="p-10 shadow-md border-l rounded-full">
          <RiBarChart2Line className="size-10 text-primary" />
        </div>
      </UniversalEmptyState>}
    </>
  )
};

export default GroupExpensesChart;