import React from "react";
import { FriendsSpendings } from "../../store/ExpenseSlice"
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Memberdetails } from "../../utils/Memberdetails";
import { UniversalEmptyState } from "../../Components/UniversalEmptyState";
import { RiLineChartLine } from "react-icons/ri";
import { FaBan } from "react-icons/fa";

export const MultiPaidVsOwes = () => {
  const data = useSelector(FriendsSpendings).map(d => ({
    name: Memberdetails(d.id)?.Name,
    Img: Memberdetails(d.id)?.Image,
    spent: d.spent,
    share: d.share,
    isBanned: Memberdetails(d.id)?.isBanned
  }));

  return (
    <div style={{ width: "100%", minWidth: "100%", height: 300 }}>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0} 
              tick={({ x, y, payload }) => {
                const item = data.find(d => d.name === payload.value);
                const imgSrc = item?.Img;
                return (
                  <foreignObject x={x - 20} y={y + 10} width={40} height={40}>
                    <>
                      <div className={`${item?.isBanned ? "border-red-500" : "border-primary"} border rounded-full size-8 relative`}>
                        <img
                          src={imgSrc}
                          alt={payload.value}
                          className={`Img-c rounded-full`}
                        />
                        {item?.isBanned && (
                          <div className="absolute top-8/11 right-4 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg">
                            <FaBan className="size-1" />
                          </div>
                        )}
                      </div>
                    </>
                  </foreignObject>
                );
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value, key) =>
                key === "spent" ? `Rs.${Number(value).toLocaleString()}` : `Rs.${Number(value).toLocaleString()}`
              }
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{
                color: "#374151",
                fontWeight: "600",
              }}
              itemStyle={{
                color: "#111827",
                fontWeight: "500",
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 30 }}
              iconType="circle"
              formatter={(value) => (value === "spent" ? "spent" : "share")}
            />
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#00C853"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="share"
              stroke="#C471F5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <UniversalEmptyState title="No data available.">
          <div className="p-10 shadow-md border-l rounded-full">
            <RiLineChartLine className="size-10 text-primary" />
          </div>
        </UniversalEmptyState>
      )}
    </div>
  );
};