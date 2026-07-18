import React from "react";
import { selectAllFriends } from "../../store/FriendsSlice";
import { selectAllGroups } from "../../store/GroupSlice";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { UniversalEmptyState } from "../../Components/UniversalEmptyState";
import { RiBarChart2Line } from "react-icons/ri";
import { FaBan } from "react-icons/fa";
export const FriendsByGroupChart = () => {
  const friends = useSelector(selectAllFriends)
  const Groups = useSelector(selectAllGroups)
  const data = friends.map(friend => {
    return {
      name: friend.Name,
      groups: friend.crews.groupCount,
      img: friend.Image,
      isBanned: friend.isBanned
    }
  })
  console.log("Data for chart:", data);
  return (
    <div style={{ width: "100%", height: 280 }}>
      {Groups.length > 0 ?
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
          >
            <XAxis
              dataKey="name"
              type="category"
              tick={({ x, y, payload }) => {
                const item = data.find(d => d.name === payload.value);
                const imgSrc = item?.img
                return (
                  <foreignObject x={x - 20} y={y  + 5} width={40} height={40}>
                    <>
                      <div className={`${item?.isBanned ? "border-red-500" : "border-primary"} border rounded-full size-8 relative`} >  <img
                        src={imgSrc}
                        alt={payload.value}
                        className={` Img-c rounded-full`}

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
              hide={data.length > 10}
            />
            <YAxis type="number" allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "rgba(251,191,36,0.15)", radius: 8 }}
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
            <Bar dataKey="groups" fill="#F59E0B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer> : <UniversalEmptyState
          title="No data available."
        >
          <div className="p-10 shadow-md border-l rounded-full">
            <RiBarChart2Line className="size-10 text-primary" />
          </div>
        </UniversalEmptyState>}
    </div>
  );
};