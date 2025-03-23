// stores/tabStore.ts
import { create } from 'zustand';

interface TabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const useTabStore = create<TabState>((set) => ({
  activeTab: 'All',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useTabStore;