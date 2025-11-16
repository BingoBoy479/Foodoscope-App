// app/services/recipes/recipeService.tsx

import apiClient from '../api/client';
import { ENDPOINTS } from '../api/config';
import { RecipesResponse, Recipe, DisplayRecipe } from './types';
import cacheService, { CACHE_KEYS } from '../cache/cacheService';

export class RecipeService {
  /**
   * Fetch explore recipes from API with caching
   */
  async getExploreRecipes(page: number = 1, limit: number = 20): Promise<DisplayRecipe[]> {
    try {
      console.log(`🍳 Fetching explore recipes: target ${limit} recipes`);
      
      // Try to get from cache first
      const cacheKey = `${CACHE_KEYS.EXPLORE_RECIPES}_${limit}`;
      const cachedData = await cacheService.getCachedData<DisplayRecipe[]>(cacheKey);
      
      if (cachedData) {
        console.log(`📦 Using cached explore recipes (${cachedData.length} recipes)`);
        return cachedData;
      }

      console.log(`📄 Fetching fresh data - ${Math.ceil(limit / 10)} pages to get ${limit} recipes`);
      
      const allRecipes: DisplayRecipe[] = [];
      const pagesNeeded = Math.ceil(limit / 10);
      
      // Fetch from multiple pages
      for (let currentPage = 1; currentPage <= pagesNeeded; currentPage++) {
        console.log(`📖 Fetching page ${currentPage}`);
        
        const response: RecipesResponse = await apiClient.get(ENDPOINTS.RECIPES.EXPLORE, {
          page: currentPage.toString(),
          limit: '10'
        });

        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch recipes');
        }

        console.log(`📊 Page ${currentPage} - Data length: ${response.payload.data.length}`);

        // Transform API data to UI-friendly format
        const displayRecipes = response.payload.data.map(recipe => 
          this.transformRecipe(recipe)
        );

        allRecipes.push(...displayRecipes);
        
        // If we've reached our target limit, break early
        if (allRecipes.length >= limit) {
          break;
        }
        
        // If this page has fewer than 10 recipes, we've reached the end
        if (response.payload.data.length < 10) {
          console.log(`🏁 Reached end of available recipes at page ${currentPage}`);
          break;
        }
      }

      // Return only the requested limit
      const finalRecipes = allRecipes.slice(0, limit);
      
      // Cache the results
      await cacheService.setCachedData(cacheKey, finalRecipes);
      
      console.log(`✅ Successfully fetched ${finalRecipes.length} recipes from ${pagesNeeded} pages`);
      return finalRecipes;

    } catch (error) {
      console.log('❌ Error in getExploreRecipes:', error);
      throw error;
    }
  }



  /**
   * Transform API recipe data to UI display format
   */
  private transformRecipe(apiRecipe: Recipe): DisplayRecipe {
    // Clean the recipe title by removing triple quotes, trademark symbols, and other special characters
    const cleanName = apiRecipe.Recipe_title
      .replace(/"""/g, '')        // Remove triple quotes
      .replace(/"/g, '')          // Remove regular quotes
      .replace(/™/g, '')          // Remove trademark symbols
      .replace(/\s+/g, ' ')       // Normalize multiple spaces to single space
      .trim();                    // Remove leading/trailing spaces
    
    return {
      id: apiRecipe.Recipe_id,
      name: cleanName, // Use the cleaned name here
      calories: Math.round(apiRecipe.Calories),
      image: apiRecipe.img_url || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      region: apiRecipe.Region,
      cookTime: apiRecipe.total_time ? `${apiRecipe.total_time} min` : 'N/A',
      rating: 4.5,
      liked: false
    };
  }

  /**
   * Get recipe by ID (for detail screen)
   */
  async getRecipeById(id: number): Promise<DisplayRecipe> {
    try {
      // Note: You'll need to verify the correct endpoint for single recipe
      // Cast the response to Recipe type since we know the structure
      const response = await apiClient.get<Recipe>(`${ENDPOINTS.RECIPES.BY_ID}/${id}`);
      return this.transformRecipe(response);
    } catch (error) {
      console.log('❌ Error fetching recipe by ID:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const recipeService = new RecipeService();

// Default export for convenience
export default recipeService;