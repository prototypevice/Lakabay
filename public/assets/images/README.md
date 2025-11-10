# Image Assets Guide

## 📸 Adding Location Images

To enhance your application with real photos of Philippine destinations, add images to this directory.

### Recommended Images

For the locations in `src/data/philippines_locations.json`, add these images:

1. `manila.jpg` - Manila skyline or Intramuros
2. `cebu.jpg` - Cebu cityscape or Magellan's Cross
3. `davao.jpg` - Davao city or Mount Apo
4. `boracay.jpg` - White Beach sunset
5. `palawan.jpg` - El Nido lagoons and limestone cliffs
6. `baguio.jpg` - Burnham Park or pine trees
7. `vigan.jpg` - Calle Crisologo cobblestone street
8. `siargao.jpg` - Cloud 9 surf break
9. `chocolate-hills.jpg` - Chocolate Hills formation
10. `mayon.jpg` - Mayon Volcano perfect cone
11. `philippines-placeholder.jpg` - Generic Philippines landscape

### Image Specifications

- **Format:** JPG or PNG
- **Recommended Size:** 1200x800 pixels
- **Max File Size:** 500KB per image
- **Aspect Ratio:** 3:2 (landscape)

### Where to Get Images

**Free Stock Photo Sites:**
- Unsplash: https://unsplash.com/s/photos/philippines
- Pexels: https://www.pexels.com/search/philippines/
- Pixabay: https://pixabay.com/images/search/philippines/

**Philippine Tourism:**
- Official Tourism Website: https://www.tourism.gov.ph/
- (Ensure proper licensing and attribution)

### How to Add Images

1. Download images from free stock photo sites
2. Rename files to match the location IDs
3. Place files in this directory (`/public/assets/images/`)
4. Images will automatically load in the application

### Attribution

If using images that require attribution:
- Keep a list in `IMAGE_CREDITS.md`
- Include photographer name and source
- Add attribution in modal or footer

### Placeholder Image

If an image is missing, the app will show a placeholder. To create a custom placeholder:

```
philippines-placeholder.jpg
```

This should be a generic image representing the Philippines (flag, map, or scenic view).

### Testing Images

After adding images:
1. Restart the dev server
2. Click on a location
3. Verify image loads correctly
4. Check image quality and aspect ratio

### Optimization Tips

To optimize images for web:
- Use online tools like TinyPNG or ImageOptim
- Compress images to reduce load times
- Consider using WebP format for better compression
- Keep file sizes under 300KB when possible

---

**Note:** This is a hackathon project. For production, consider using a CDN or cloud storage service.
