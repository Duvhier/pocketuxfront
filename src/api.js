// src/api.js
export async function fetchCodigos() {
    try {
      const response = await fetch('/api/codigos');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching codigos:", error);
      throw error;
    }
  }
  