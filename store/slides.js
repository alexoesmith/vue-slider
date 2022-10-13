// store/filters.js
import { defineStore } from "pinia";

export const useSlidesStore = defineStore({
  id: "slides",
  state: () => {
    return {
      slides: [],
    };
  },
});
