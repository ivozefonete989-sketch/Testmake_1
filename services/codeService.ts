// Simulate backend logic
export const reserveCode = async (productId: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate database selection: SELECT code FROM warehouse WHERE status='active'
      const prefix = productId.toUpperCase().replace('MB_', '');
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const secondPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      resolve(`${prefix}-${randomPart}-${secondPart}`);
    }, 1500);
  });
};
