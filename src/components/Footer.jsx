import React from "react";

export default function Footer({ todos }) {
  const totalItem = todos?.length;
  const checkedItem = todos?.filter((item) => item.completed == 1).length;
  const persentage = Math.round((checkedItem / totalItem) * 100);
  return (
    <footer className="bg-slate-500 flex justify-center items-center sticky bottom-0 p-6">
      {todos && (
        <div className="text-white">
          There are {totalItem} tasks listed, {checkedItem} task have been
          completed ({persentage}%)
        </div>
      )}
    </footer>
  );
}
