export const useFavorite = () => {
  // Add university to favorites
  const addFavorite = (newFavorite: any) => {
      // Check if the university is already in favorites
      if (isInFavorite(newFavorite.name))
          return;
      // Get current favorites from localStorage
      let favorites = getAllFavorites();
      // Add new favorite to the favorites list
      favorites.push(newFavorite);
      // Update favorites in localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Remove university from favorites
  const removeFavorite = (newFavorite: any) => {
      // Get current favorites from localStorage and filter out the specified university
      const favorites = getAllFavorites().filter((university: any) => university.name !== newFavorite.name)
      // Update favorites in localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Initialize favorites from localStorage
  const getAllFavorites = () => {
      // Check if window object is available (for server-side rendering)
      if (typeof window !== 'undefined') {
          // Get favorites from localStorage
          const favorites = localStorage.getItem('favorites');
          // Parse favorites from JSON or return an empty array if no favorites are found
          return favorites ? JSON.parse(favorites) : [];
      }
      // Return an empty array if localStorage is not available (e.g., during server-side rendering)
      return [];
  }

  // Check if a university is in favorites
  const isInFavorite = (newFavorite: any) => {
      // Check if the specified university exists in the favorites list
      let result = getAllFavorites().some((university: any) => university.name === newFavorite.name);
      return result;
  }

  // Return functions for external use
  return {
      addFavorite,
      removeFavorite,
      getAllFavorites,
      isInFavorite
  };
}
