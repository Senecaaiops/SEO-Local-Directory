import fs from 'fs';
import path from 'path';

// Locate your centralized directory database file path
const jsonPath = path.resolve('seo_directory_data.json');

try {
  // Read and parse the target JSON data string
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const directoryData = JSON.parse(rawData);

  let totalRemovedCount = 0;

  // Process data blocks to strip fake listings containing 555- patterns
  const updatedData = directoryData.map((categoryBlock) => {
    if (categoryBlock.listings && Array.isArray(categoryBlock.listings)) {
      const originalCount = categoryBlock.listings.length;
      
      // Filter array layout: Only keep real numbers, drop the 555 listings
      categoryBlock.listings = categoryBlock.listings.filter((business) => {
        const phoneNumber = business.phone || '';
        return !phoneNumber.includes('555-');
      });

      const itemsRemoved = originalCount - categoryBlock.listings.length;
      totalRemovedCount += itemsRemoved;
    }
    return categoryBlock;
  });

  // Write the cleaned JSON objects straight back into your disk storage
  fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`\x1b[32m✔ Success! Permanently erased ${totalRemovedCount} fake business listings from your data file.\x1b[0m`);

} catch (error) {
  console.error('\x1b[31m✖ Automated script error: Could not process directory file.\x1b[0m', error.message);
}
