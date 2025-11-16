// app/services/recipes/types.tsx

/**
 * TypeScript interfaces for recipe data
 * Based on the API response structure you provided
 */

export interface Recipe {
  Recipe_id: number;
  Calories: number;
  cook_time: string;
  prep_time: string;
  servings: string;
  Recipe_title: string;
  total_time: string;
  url: string;
  Region: string;
  Sub_region: string;
  Continent: string;
  Source: string;
  img_url: string;
  "Carbohydrate, by difference (g)": number;
  "Energy (kcal)": number;
  "Protein (g)": number;
  "Total lipid (fat) (g)": number;
  Processes: string;
  vegan: string;
  pescetarian: string;
  ovo_vegetarian: string;
  lacto_vegetarian: string;
  ovo_lacto_vegetarian: string;
}

export interface RecipesResponse {
  success: boolean;
  message: string;
  payload: {
    data: Recipe[];
  };
}

// Simplified recipe for UI display
export interface DisplayRecipe {
  id: number;
  name: string;
  calories: number;
  rating?: number;
  image: string;
  liked?: boolean;
  region?: string;
  cookTime?: string;
}

// For TypeScript files that don't need a React component default export,
// you can export a dummy object or just export the types
// This satisfies Expo Router's requirement for a default export
const RecipeTypes = {
  Recipe: 'Recipe' as const,
  RecipesResponse: 'RecipesResponse' as const,
  DisplayRecipe: 'DisplayRecipe' as const,
};

export default RecipeTypes;