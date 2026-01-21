import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({ 
    // for holding xlsx data
    xlsx_data: null, 

    // a simple count state
    count: 0
 }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})