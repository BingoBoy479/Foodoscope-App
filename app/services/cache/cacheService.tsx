// app/services/cache/cacheService.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Cache service for storing API responses
 */

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class CacheService {
  /**
   * Get cached data if it exists and is not expired
   */
  async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache is still valid
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log(`📦 Using cached data for: ${key}`);
        return data;
      }
      
      // Cache expired, remove it
      console.log(`🕐 Cache expired for: ${key}`);
      await AsyncStorage.removeItem(key);
      return null;

    } catch (error) {
      console.log('❌ Error reading from cache:', error);
      return null;
    }
  }

  /**
   * Store data in cache with timestamp
   */
  async setCachedData<T>(key: string, data: T): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
      console.log(`💾 Data cached for: ${key}`);
    } catch (error) {
      console.log('❌ Error writing to cache:', error);
    }
  }

  /**
   * Clear specific cache key
   */
  async clearCache(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`🧹 Cache cleared for: ${key}`);
    } catch (error) {
      console.log('❌ Error clearing cache:', error);
    }
  }

  /**
   * Clear all cache
   */
  async clearAllCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
      console.log('🧹 All cache cleared');
    } catch (error) {
      console.log('❌ Error clearing all cache:', error);
    }
  }
}

// Cache keys
export const CACHE_KEYS = {
  EXPLORE_RECIPES: 'cache_explore_recipes',
  RECOMMENDED_RECIPES: 'cache_recommended_recipes'
};

// Create and export a singleton instance
export const cacheService = new CacheService();

// Default export for convenience
export default cacheService;