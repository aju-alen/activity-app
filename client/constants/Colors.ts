/**
 * Colors
 *
 * This file centralizes all colors used across the application.
 * Import from this file instead of defining colors in individual files.
 */

export const COLORS = {
  light: {
    mode: 'light',
    primary: '#6AE28D',
    secondary: ['#B7E2FF', '#FFD6E0', '#D4C4FF'],
    background: '#F9FAFC',
    surface: '#FFFFFF',
    accent: {
      calories: '#B4F18F',
      carbohydrates: '#B7E2FF',
      protein: '#FFB9B9',
      fats: '#FFE3B3'
    },
    text: {
      primary: '#000000',
      secondary: '#808080',
      inverse: '#FFFFFF'
    },
    icon: {
      default: '#000000',
      inactive: '#BDBDBD'
    },
    button: {
      default: {
        background: '#B4F18F',
        text: '#000000'
      },
      outlined: {
        background: 'transparent',
        text: '#000000',
        border: '#000000'
      }
    },
    border: '#E0E0E0',
    tags: ['#C1F7E3', '#FFEBE5', '#F3F0FF'],
    cards: {
      background: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.05)',
    },
    chart: {
      calories: '#B4F18F',
      carbohydrates: '#B7E2FF',
      protein: '#FFB9B9',
      fats: '#FFE3B3'
    }
  },

  dark: {
    mode: 'dark',
    primary: '#6AE28D',
    secondary: ['#3A5A6E', '#5E4D57', '#594F74'],
    background: '#121212',
    surface: '#1E1E1E',
    accent: {
      calories: '#97D875',
      carbohydrates: '#8CCFFF',
      protein: '#FF8A8A',
      fats: '#FFDB99'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
      inverse: '#000000'
    },
    icon: {
      default: '#FFFFFF',
      inactive: '#666666'
    },
    button: {
      default: {
        background: '#B4F18F',
        text: '#ffffff'
      },
      outlined: {
        background: 'transparent',
        text: '#FFFFFF',
        border: '#FFFFFF'
      }
    },
    border: '#333333',
    tags: ['#3A6657', '#805D5D', '#746F94'],
    cards: {
      background: '#1E1E1E',
      shadow: 'rgba(255, 255, 255, 0.05)',
    },
    chart: {
      calories: '#97D875',
      carbohydrates: '#8CCFFF',
      protein: '#FF8A8A',
      fats: '#FFDB99'
    }
  }
};
