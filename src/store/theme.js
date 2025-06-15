// store/theme.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: JSON.parse(localStorage.getItem('dark-mode')) || false,
  }),
  actions: {
    toggle() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('dark-mode', JSON.stringify(this.isDarkMode))
      this.applyTheme()
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    },
    init() {
      this.applyTheme()
    }
  }
})
