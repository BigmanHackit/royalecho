'use client';

import useTabStore from "@/stores/tabStore";

interface TabsProps {
  categories: string[];
}

export default function Tabs({ categories }: TabsProps) {
  const { activeTab, setActiveTab } = useTabStore();

  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">No categories available</p>;
  }

  return (
    <div className="flex space-x-4 my-8 border-b py-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(category)}
          className={`px-4 rounded font-regular text-[14px] ${
            activeTab === category ? "bg-[#000428] text-gray-50 scale-110 transition-all" : "text-[#000428]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
