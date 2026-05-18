# TS Aromatics — Product Image Guide

## Architecture

Product images are resolved through a two-layer system:

```
imgKey (in rawProducts entry)
    └─► images map (products.ts line 69–123)
            └─► public path
```

Each `rawProducts` entry has an `imgKey` field. The `images` map in `src/data/products.ts` converts that key to a URL path:

```
imgKey: 'lavender'   →   '/images/products/lavender-oil/botanical.svg'
imgKey: 'carrier'    →   '/images/products/carrier.svg'          (shared SVG)
imgKey: 'coconut'    →   '/images/products/extra-virgin-coconut-oil/product.jpg'   (real photo)
```

## Image Types

| Type | Path Pattern | Count |
|---|---|---|
| **Real product photo** | `/images/products/{product-id}/product.jpg` | 7 products |
| **Dedicated botanical SVG** | `/images/products/{product-id}/botanical.svg` | 3 products |
| **Shared category SVG** | `/images/products/{category}.svg` | ~117 products fallback |

### Shared SVGs (used as fallbacks)

These SVGs serve multiple products grouped by visual category:

| File | Used By |
|---|---|
| `carrier.svg` | Carrier Oils, Butters, Seed Oils |
| `floral.svg` | Floral Oils, Floral Waters, Extracts, Aloe |
| `spice.svg` | Spice Oils, Oleoresins |
| `citrus.svg` | Citrus Oils |
| `woods.svg` | Woody Oils, Industrial compounds |
| `mint.svg` | Mint products |
| `fallback.svg` | Any product with unassigned imgKey |

## Adding a Real Product Image

### Step 1: Place the image file

```
public/images/products/{product-id}/product.jpg
```

Example: `public/images/products/lavender-oil/product.jpg`

### Step 2: Update the `images` map in `products.ts`

Find the `imgKey` entry and point it to the real image:

```typescript
// Before (shared SVG):
lavender: '/images/products/lavender-oil/botanical.svg',

// After (real photo):
lavender: '/images/products/lavender-oil/product.jpg',
```

If the product uses a shared SVG (most common), change its dedicated entry or add one:

```typescript
// Before (shared fallback):
'linseed-oil': '/images/products/carrier.svg',

// After (real photo):
'linseed-oil': '/images/products/linseed-oil/product.jpg',
```

### Step 3: Update Image Library.xlsx

Open `products/TSA_Aromatics_Image_Library.xlsx` and set `Image Generated: Yes` for the product.

### Step 4: Verify

```bash
npm run build
```

## Current Image Status (as of May 2026)

### Products with real photos (product.jpg)

| Product ID | Image |
|---|---|
| `extra-virgin-coconut-oil` | `/images/products/extra-virgin-coconut-oil/product.jpg` |
| `avocado-oil` | `/images/products/avocado-oil/product.jpg` |
| `sweet-almond-oil` | `/images/products/sweet-almond-oil/product.jpg` |
| `jojoba-oil-carrier` | `/images/products/jojoba-oil-carrier/product.jpg` |
| `shea-butter` | `/images/products/sheabutter/product.png` |
| `mango-butter` | `/images/products/mango-butter/product.png` |
| `cocoa-butter` | `/images/products/cocoa-butter/product.png` |

### Products with dedicated botanical SVGs

| Product ID | Image |
|---|---|
| `lavender-oil` | `/images/products/lavender-oil/botanical.svg` |
| `tea-tree-oil` | `/images/products/tea-tree-oil/botanical.svg` |
| `eucalyptus-oil` | `/images/products/eucalyptus-oil/botanical.svg` |

### All other products (117)

Use shared category SVGs (`carrier.svg`, `floral.svg`, `spice.svg`, etc.).

## Image Specifications

| Property | Recommended |
|---|---|
| Format | JPEG (.jpg) |
| Dimensions | 800×800 px (square) |
| Quality | 85–92% |
| Color space | sRGB |
| Max file size | < 500 KB |
| Background | Transparent or off-white |
| Subject | Product bottle / jar on clean background |

## Product Folder Structure

After you add images, the folder for a product should look like:

```
public/images/products/lavender-oil/
├── .gitkeep           ← placeholder (delete after adding images)
└── product.jpg        ← your generated image
```

## Batch Update Workflow

When you have multiple images ready:

1. Drop all `product.jpg` files into the corresponding product folders
2. Run a script to update the `images` map in `products.ts`
3. Update Image Library.xlsx with `Image Generated: Yes`
4. Remove `.gitkeep` files from updated folders
5. Build and deploy

```bash
# Build check after adding images
npm run build
# If pass, commit and push
git add -A
git commit -m "feat: add product images for [product names]"
git push
```
