// store/filters.js
import { defineStore } from "pinia";

export const usePagesStore = defineStore({
  id: "pages",
  state: () => {
    return {
      pages: [],
    };
  },
});
