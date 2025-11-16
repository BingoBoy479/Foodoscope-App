

// Base API URL - easily change between development/production
export const API_CONFIG = {
  BASE_URL: 'http://192.168.1.92:3031/recipe2-api',
  
  // Default headers for all requests
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  
  // Timeout settings (in milliseconds)
  TIMEOUT: 10000, // 10 seconds
  
  // Retry configuration
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000, // 1 second
};

/**
 * API Endpoints - Centralized endpoint definitions
 * Easy to update if API paths change
 */
export const ENDPOINTS = {
  // Recipe endpoints
  RECIPES: {
    EXPLORE: '/recipe/recipesinfo',
    RECOMMENDED: '/recipe/recipeofday',
    BY_ID: '/search-recipe', // Note: Check if this is correct endpoint
    BY_TITLE: '/recipe-bytitle/recipeByTitle',
    BY_CUISINE: '/recipes_cuisine/cuisine',
    BY_INGREDIENTS: '/recipebyingredient/by-ingredients-categories-title',
    BY_REGION_DIET: '/recipe/region-diet/region-diet',
  },
  
  // Nutrition endpoints
  NUTRITION: {
    INFO: '/recipe-nutri/nutritioninfo',
    MICRO: '/recipe-micronutri/micronutritioninfo',
    CALORIES: '/recipes-calories/calories',
    PROTEIN: '/protein/protein-range',
    CARBS: '/recipe-carbo/recipes-by-carbs',
  },
  
  // Meal planning
  MEAL_PLAN: '/mealplan/meal-plan',
  
  // Instructions
  INSTRUCTIONS: '/instructions',
};

/**
 * Error Messages - Standardized error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Authentication failed.',
  NOT_FOUND: 'Resource not found.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

export default API_CONFIG;