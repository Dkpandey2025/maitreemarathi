import React from "react";
export default function PlanCard({ name, price, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-2xl p-5 cursor-pointer transition-all ${
        selected
          ? "border-purple-500 bg-purple-50 shadow-md"
          : "border-gray-300 hover:border-purple-400"
      }`}
    >
      <h3 className="text-lg font-semibold text-purple-600">{name}</h3>
      <p className="text-gray-600 mt-2 mb-3">₹{price}</p>
      <button
        className={`px-4 py-2 rounded-lg font-semibold ${
          selected
            ? "bg-purple-600 text-white"
            : "bg-white border border-purple-600 text-purple-600 hover:bg-purple-50"
        }`}
      >
        {selected ? "Selected" : "Choose Plan"}
      </button>
    </div>
  );
}
