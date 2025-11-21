import React from "react";
export default function AdminStats({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border text-center">
      <h4 className="text-gray-600 font-medium">{title}</h4>
      <p className="text-2xl font-bold text-orange-600">{value}</p>
    </div>
  );
}
