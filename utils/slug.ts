// // utils/slug.ts

// export const toSlug = (name) => {
//   if (!name) return ''; // Handle cases where name might be undefined or null
//   return name.toLowerCase().replace(/\s+/g, '-');
// };

// export const fromSlug = (slug) => {
//   if (!slug) return ''; // Handle cases where slug might be undefined or null
//   return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// };

// src/utils/slug.js

/**
 * Converts a string into a URL-friendly slug.
 * - Converts to lowercase.
 * - Replaces '&' with 'and'.
 * - Removes commas and other non-alphanumeric characters (except spaces and hyphens).
 * - Replaces multiple spaces with a single hyphen.
 * - Replaces multiple hyphens with a single hyphen.
 * - Trims leading/trailing whitespace and hyphens.
 * @param {string} text The input string to convert.
 * @returns {string} The URL-friendly slug.
 */
export function toSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD') // Normalize diacritics (e.g., é -> e)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and') // Replace '&' with 'and'
    .replace(/,/g, '') // Remove commas
    .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Replace multiple - with single -
}

/**
 * Converts a slug back into a more readable string (simple capitalization).
 * @param {string} slug The input slug to convert.
 * @returns {string} The human-readable string.
 */
export function fromSlug(slug) {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b(\w)/g, s => s.toUpperCase()); // Capitalize first letter of each word
}
