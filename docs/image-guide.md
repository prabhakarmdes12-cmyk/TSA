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
| **Real product image** | `/images/products/{product-id}/product.png` | 127/127 products |
| **Category SVG (fallback key)** | `/images/products/{category}.svg` | unused for product display (keys remain in `images` record) |

### Shared SVGs (category fallback keys)

These SVGs remain in the `images` record as fallback entries — they are NOT actively used for product display since all 127 products have `product.png` entries that take priority via `images[p.id]`.

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

## Current Image Status (as of May 2026)

**All 127 products have real product images.** Every product ID has an entry in the `images` record pointing to its `public/images/products/{id}/product.png`.

Image resolution logic:
```
images[p.id] || images[p.imgKey] || images.fallback
```

- `images[p.id]` — product-specific `product.png` (127/127 populated)
- `images[p.imgKey]` — category SVG (e.g., `citrus.svg`, `carrier.svg`) — fallback only
- `images.fallback` — `/images/products/fallback.svg` — last resort

### Products that initially had missing images (now resolved)
- `aloe-butter-product` — missing file, now added
- `pine-oil` — missing file + code entry, now added
- `spearmint-oil-alt` — missing file + code entry, now added

### Products initially pointing to SVGs (now updated to `product.png`)
- `rice-bran-oil`, `linseed-oil`, `safflower-oil`, `walnut-oil`, `broccoli-oil`, `raspberry-seed-oil`, `marula-oil`, `aloe-vera-oil`
- `dill-oil`, `turmeric-oil`, `fennel-seed-oil`, `eugenol`, `alpha-pinene`
- `kokum-butter`, `myrhh-oil`, `neroli-oil`

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
