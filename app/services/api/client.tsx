

import { API_CONFIG, ERROR_MESSAGES } from './config';

/**
 * Custom HTTP Client
 * Handles all API requests with consistent error handling, timeouts, and retries
 */

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS;
  }

  /**
   * Main request method with timeout and retry logic
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries = API_CONFIG.MAX_RETRIES
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      signal: controller.signal,
    };

    try {
      console.log(`🌐 API Request: ${url}`);
      
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      console.log(`📊 Response Status: ${response.status} for ${endpoint}`);

      // Handle non-OK responses
      if (!response.ok) {
        throw this.handleHttpError(response);
      }

      // Parse JSON response
      const data = await response.json();
      console.log(`✅ API Success: ${endpoint}`);
      
      return data;

    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic for network errors
      if (this.shouldRetry(error) && retries > 0) {
        console.log(`🔄 Retrying request (${retries} attempts left)...`);
        await this.delay(API_CONFIG.RETRY_DELAY);
        return this.request<T>(endpoint, options, retries - 1);
      }

      console.log(`❌ API Error for ${endpoint}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Determine if a request should be retried
   */
  private shouldRetry(error: any): boolean {
    return (
      error.name === 'AbortError' || // Timeout
      error.name === 'TypeError' || // Network failure
      error.message?.includes('Network request failed')
    );
  }

  /**
   * Handle HTTP error responses
   */
  private handleHttpError(response: Response): Error {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    
    switch (response.status) {
      case 401:
        error.message = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 404:
        error.message = ERROR_MESSAGES.NOT_FOUND;
        break;
      case 500:
        error.message = ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        error.message = `Request failed with status ${response.status}`;
    }
    
    return error;
  }

  /**
   * Handle other types of errors
   */
  private handleError(error: any): Error {
    if (error.name === 'AbortError') {
      return new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
    }
    
    if (error.message?.includes('Network request failed')) {
      return new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // If it's already our custom error, return it
    if (error.message && error.message !== 'Failed to fetch') {
      return error;
    }

    return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }

  /**
   * Public methods for different HTTP verbs
   */

  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<T> {
    const url = queryParams 
      ? `${endpoint}?${new URLSearchParams(queryParams).toString()}`
      : endpoint;
    
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Default export for convenience
export default apiClient;