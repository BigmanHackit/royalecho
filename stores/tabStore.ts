import { create } from 'zustand';

type TabStore = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const useTabStore = create<TabStore>((set) => ({
  activeTab: 'Web', // Default tab
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useTabStore;
