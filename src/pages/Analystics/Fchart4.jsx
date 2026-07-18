import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { selectAllGroups } from "../../store/GroupSlice";
import { useSelector } from "react-redux";
import { UniversalEmptyState } from "../../Components/UniversalEmptyState";
import { RiLineChartLine } from "react-icons/ri";
const GroupSizeChart = () => {
  const Groups = useSelector(selectAllGroups)
  const data = [...Groups].map(g => (
    {
      name: g.Name,
      Members: g.Members.length
    }
  ))
  return (
    <>
      {data.length > 0 ?
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis type="number" />
            <Tooltip
              cursor={{ stroke: "#ff6b35", strokeWidth: 1 }}
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
              }} />
            <Line
              type="monotone"
              dataKey="Members"
              stroke="#ff6b35"
              strokeWidth={3}
              dot={{ r: 6, stroke: "#ff6b35" }}
              activeDot={{ r: 8, fill: "#ff6b35" }}
            />
          </LineChart>
        </ResponsiveContainer>
        : <UniversalEmptyState
          title="No data available."
        >
          <div className="p-10 shadow-md border-l rounded-full">
            <RiLineChartLine className="size-10 text-primary" />
          </div>
        </UniversalEmptyState>
      }
    </>

  )
};

export default GroupSizeChart;