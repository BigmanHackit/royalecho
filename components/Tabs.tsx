import React from 'react';
import useTabStore from '@/stores/tabStore';

interface TabsProps {
  categories: string[];
}

export default function Tabs({ categories }: TabsProps) {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveTab(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === category
              ? 'bg-[#2C5364] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}