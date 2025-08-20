const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  async fetchTerms(lang = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/terms?lang=${lang}`);
      console.log("🚀 ~ ApiService ~ fetchTerms ~ response:", response)
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch terms');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching terms:', error);
      throw error;
    }
  }

  async fetchProducts(category = null) {
    try {
      const url = category 
        ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/products`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async fetchProductCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch categories');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

export default new ApiService();