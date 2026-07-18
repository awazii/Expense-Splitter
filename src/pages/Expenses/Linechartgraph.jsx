import { LineChart, Tooltip, Line, XAxis, ResponsiveContainer } from 'recharts';

const LineChartExample = ({ type, data }) => {
  return (
   
    <ResponsiveContainer width="100%" height={30} className="mt-5">
      <LineChart data={data}>
        <XAxis dataKey="date" hide />
        <Tooltip 
          contentStyle={{
            borderRadius: '10px'
          }}
          formatter={(value) => {
            const formatted = Number(value).toLocaleString();
            return type === "expenses"
              ? [`Rs.${formatted}`, "Amount"]
              : [formatted, "Count"];
          }}
        />
        {type === "expenses" ? (
          <Line
            type="monotone"
            dataKey="amount"
            stroke="black"
            strokeWidth={2}
            dot={true} 
          />
        ) : (
          <Line
            type="monotone"
            dataKey="count"
            stroke="black"
            strokeWidth={2}
            dot={true} 
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
};

export default LineChartExample;