import React from "react";
import { selectFriendById } from "../../../store/FriendsSlice";
import { useSelector } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { FaBan } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
export const Comparisongraph = ({ Expense }) => {
    const friends = (id) => {
        return useSelector(state => selectFriendById(state, id))
    }
    const data = Expense?.Members.map(member => {
        const friend = friends(member.id)
        let obj = {}
        if (friend) {
            obj = {
                name: friend?.Name,
                img: friend?.Image,
                spent: member?.spent,
                share: member?.share,
                isBanned: friend?.isBanned
            }
        }
        else {
            let temp = Expense.temporary.find(t => t.id === member.id)
            obj = {
                name: temp?.Name,
                type: temp?.type,
                spent: member?.spent,
                share: member?.share,
                isBanned: member?.isBanned || false
            }
        }
        return obj
    })
    return (
        <div style={{ width: "100%", height:'100%'  }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 30, left: 5, bottom: 30 }}
                >
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tick={({ x, y, payload }) => {
                            const item = data.find(d => d.name === payload.value);
                            const imgSrc = item?.img;
                            return (
                                <foreignObject x={x - 40} y={y - 15} width={40} height={40}>
                                    {
                                        imgSrc ? <>
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
                                        </> :
                                            <div className="friend-img-container size-8 bg-neutral-300 rounded-full center-flex">
                                                <IoPerson className='size-3 text-neutral-500' />
                                            </div>
                                    }


                                </foreignObject>
                            );
                        }}
                        hide={data.length > 8}
                    />
                    <Tooltip
                        cursor={{ fill: "#f9f1ff", radius: 8 }}
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
                        formatter={(val, name, props) => {
                            if (name === "share") {
                                return [`Rs. ${Number(val).toLocaleString()}`, "share"];
                            }
                            if (name === "spent") {
                                return [`Rs. ${Number(val).toLocaleString()}`, "spent"];
                            }
                            return val;
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            paddingTop: 20,
                        }}
                        iconType="circle"
                    />
                    <Bar dataKey="share" fill="#C471F5" radius={[0, 6, 6, 0]} />
                    <Bar dataKey="spent" fill="#00C853" radius={[0, 6, 6, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};