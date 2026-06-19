# TS Aromatics — Product Image Guide

## Architecture

Product images are resolved through a two-layer system:

```
imgKey (in rawProducts entry)
    └─► images map (products.ts lines ~69–196)
            └─► public path
```

Each `rawProducts` entry has an `imgKey` field. The `images` map in `src/data/products.ts` converts that key to a URL path:

```
imgKey: 'citrus'     →   '/images/products/citrus.svg'          (category fallback)
imgKey: 'carrier'    →   '/images/products/carrier.svg'          (category fallback)
```

But product-specific entries take priority in the loading logic:
```
images[p.id] || images[p.imgKey] || images.fallback
```

## Image Types

| Type | Path Pattern | Count |
|---|---|---|
| **Real product image** | `/images/products/{product-id}/product.png` | 173/173 products |
| **Category SVG (fallback key)** | `/images/products/{category}.svg` | unused for product display (keys remain in `images` record) |

### Shared SVGs (category fallback keys)

These SVGs remain in the `images` record as fallback entries — they are NOT actively used for product display since all 173 products have `product.png` entries that take priority via `images[p.id]`.

## Adding a Real Product Image

### Step 1: Place the image file

```
public/images/products/{product-id}/product.png
```

Example: `public/images/products/lavender-oil/product.png`

If the directory doesn't exist yet, create it:
```
public/images/products/{product-id}/
└── product.png
```

### Step 2: Update the `images` map in `products.ts`

Add an entry to the `images` record in `src/data/products.ts`:

```typescript
'{product-id}': '/images/products/{product-id}/product.png',
```

Insert it alphabetically among the other product-specific entries (lines ~83–196).

### Step 3: Update the Excel files

- Open `products/TSA_Aromatics_Image_Library.xlsx` → set `Image Generated` (col G) to ✅
- Open `products/TS_Aromatics_Master.xlsx` → set `Image Status` (col F) to ✅

### Step 4: Verify

```bash
npm run build
```

### Step 5: Commit

```bash
git add -A
git commit -m "Add image for [product-name]"
git push
```

## Current Image Status (as of June 2026)

**127 of 173 products have real product images.** All 173 product IDs have entries in the `images` record, but only 127 have `product.png` files on disk. The remaining  products (added from tsaromatic.com catalog sync) need AI-generated images.

Image resolution logic:
```
images[p.id] || images[p.imgKey] || images.fallback
```

- `images[p.id]` — product-specific `product.png` (173/173 populated, 0 pending)
- `images[p.imgKey]` — category SVG (e.g., `citrus.svg`, `carrier.svg`) — fallback only
- `images.fallback` — `/images/products/fallback.svg` — last resort

### New Products Pending Images (46)
These products have code entries and image record entries, but no `product.png` yet. See TSA_Aromatics_Image_Library.xlsx — col G blank = generate image.
- `anise-oil`, `arachis-oil`, `bay-leaf-oil`, `bhimseni-camphor`, `black-sesame-oil`, `cade-oil`, `cajeput-oil`, `calendula-oil`, `camphor-powder`, `cassia-oil`, `celery-seed-oil`, `clary-sage-oil`, `coconut-milk-powder`, `cold-pressed-coconut-oil`, `curry-leaf-oil`, `cypriol-oil`, `double-boiled-linseed-oil`, `essential-aroma-oils`, `ethyl-vanillin`, `evening-primrose-oil`, `fenugreek-seed-oil`, `fragrance-oils`, `ginger-lily-oil`, `hazelnut-oil`, `holy-basil-oil`, `isoborneol-flakes`, `kashmiri-saffron`, `lite-olive-oil`, `mct-coconut-oil`, `menthol-bold-crystals`, `menthol-large-crystals`, `menthol-long-crystals`, `menthol-medium-crystals`, `mulberry-extract`, `niaouli-oil`, `olive-pomace-oil`, `onion-seed-oil`, `perfumery-compounds`, `piperine-extract`, `pumpkin-seed-oil`, `raw-linseed-oil`, `refined-groundnut-oil`, `rosewood-oil`, `saw-palmetto-oil`, `soybean-oil`, `vitamin-e-powder`

## Image Specifications

| Property | Recommended |
|---|---|
| Format | PNG (.png) |
| Dimensions | 800×800 px (square) |
| Color space | sRGB |
| Max file size | < 500 KB |
| Background | Transparent or off-white |
| Subject | Product bottle / jar on clean background |

## Product Folder Structure

After you add images, the folder for a product should look like:

```
public/images/products/lavender-oil/
└── product.png        ← your generated image
```

## Batch Update Workflow (for future additions)

When adding new products with images:

1. Create a new directory `public/images/products/{product-id}/`
2. Place `product.png` in it
3. Add an entry to the `images` record in `src/data/products.ts`
4. Add the product row to both Excel files with ✅
5. Build and deploy

```bash
npm run build
git add -A
git commit -m "feat: add [product-name] with image"
git push
```
