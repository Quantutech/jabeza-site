// utils/paths.ts
const basePath = process.env.NODE_ENV === 'production' 
  ? '/jabeza-site' // Replace with your actual repository name
  : '';

export const getAssetPath = (path: string): string => {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

export default {
  basePath,
  getAssetPath
};