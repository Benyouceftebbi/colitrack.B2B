/**
 * Generate a random 3-character alphanumeric code
 */
function generateRandomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 3; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  
  /**
   * Generate a unique 3-character code that doesn't exist in the existing codes
   */
  export function generateUniqueCode(existingCodes: string[]): string {
    const existingSet = new Set(existingCodes.map((c) => c.toUpperCase()));
    let code = generateRandomCode();
    let attempts = 0;
    const maxAttempts = 1000;
  
    while (existingSet.has(code) && attempts < maxAttempts) {
      code = generateRandomCode();
      attempts++;
    }
  
    if (attempts >= maxAttempts) {
      throw new Error("Unable to generate unique code after maximum attempts");
    }
  
    return code;
  }
  
  /**
   * Convert a Google Maps short link to an embeddable iframe URL
   * Supports formats like:
   * - https://maps.app.goo.gl/xxxxx
   * - https://goo.gl/maps/xxxxx
   * - https://www.google.com/maps/place/...
   * - Plus codes like 8V36+P63
   */
  export function convertToIframeUrl(shortLink: string): string {
    if (!shortLink || shortLink.trim() === "") {
      return "";
    }
  
    const trimmed = shortLink.trim();
  
    // Already an embed URL
    if (trimmed.includes("output=embed")) {
      return trimmed;
    }
  
    // Google Maps short link (maps.app.goo.gl or goo.gl/maps)
    if (trimmed.includes("maps.app.goo.gl") || trimmed.includes("goo.gl/maps")) {
      // Extract the location from the short link and create an embed URL
      // For short links, we use the direct link as a search query
      return `https://www.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed&hl=fr`;
    }
  
    // Full Google Maps URL with coordinates or place
    if (trimmed.includes("google.com/maps")) {
      // Extract coordinates if present
      const coordMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        return `https://www.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed&hl=fr`;
      }
  
      // Extract place name
      const placeMatch = trimmed.match(/place\/([^/@]+)/);
      if (placeMatch) {
        return `https://www.google.com/maps?q=${encodeURIComponent(
          decodeURIComponent(placeMatch[1])
        )}&output=embed&hl=fr`;
      }
  
      // Fallback: use the entire URL as a query
      return `https://www.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed&hl=fr`;
    }
  
    // Plus code or address - create search URL
    return `https://www.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed&hl=fr`;
  }
  
  /**
   * Extract short link from an iframe URL if possible
   */
  export function extractMapLink(iframeUrl: string): string {
    if (!iframeUrl) return "";
    
    // If it's already a short link, return as is
    if (iframeUrl.includes("maps.app.goo.gl") || iframeUrl.includes("goo.gl/maps")) {
      return iframeUrl;
    }
    
    // Try to extract the query parameter
    try {
      const url = new URL(iframeUrl);
      const query = url.searchParams.get("q");
      if (query) {
        // If the query is a URL, return it directly
        if (query.startsWith("http")) {
          return query;
        }
        return query;
      }
    } catch {
      // If URL parsing fails, return the original
    }
    
    return iframeUrl;
  }
  