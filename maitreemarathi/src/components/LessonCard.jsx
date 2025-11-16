import React from "react";

export default function LessonCard({ title, locked, onOpen }) {
  return (
    <div
      className={`p-4 border rounded-xl shadow-sm ${
        locked ? "bg-gray-100 text-gray-400" : "bg-white hover:shadow-lg"
      }`}
    >
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {locked ? (
        <p>🔒 Unlock previous lessons first</p>
      ) : (
        <button
          onClick={onOpen}
          className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Open Lesson
        </button>
      )}
    </div>
  );
}
