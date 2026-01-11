import type { PrintifyProduct, PrintifyShop, Product } from '@/lib/types';

const printifyApiUrl = 'https://api.printify.com/v1';

function getPrintifyApiKey(): string {
  const apiKey = process.env.PRINTIFY_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Printify API key. Set PRINTIFY_API_KEY in the .env file.');
  }
  return apiKey;
}

async function getShops(): Promise<PrintifyShop[]> {
  const apiKey = getPrintifyApiKey();
  const response = await fetch(`${printifyApiUrl}/shops.json`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    next: { revalidate: 3600 } // Revalidate every hour
  });
  if (!response.ok) {
    const details = await response.text();
    const message = details
      ? `Failed to fetch Printify shops (${response.status} ${response.statusText}): ${details}`
      : `Failed to fetch Printify shops (${response.status} ${response.statusText})`;
    throw new Error(message);
  }
  return response.json();
}

export async function getPrintifyProducts(shopId?: string): Promise<PrintifyProduct[]> {
  let shopToFetch = shopId;
  if (!shopToFetch) {
    const shops = await getShops();
    if (shops.length === 0) {
      throw new Error('No Printify shops found for this API key.');
    }
    shopToFetch = shops[0].id.toString();
  }

  const apiKey = getPrintifyApiKey();
  const response = await fetch(`${printifyApiUrl}/shops/${shopToFetch}/products.json`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!response.ok) {
    const details = await response.text();
    const message = details
      ? `Failed to fetch products for shop ${shopToFetch} (${response.status} ${response.statusText}): ${details}`
      : `Failed to fetch products for shop ${shopToFetch} (${response.status} ${response.statusText})`;
    throw new Error(message);
  }
  
  const productsResponse = await response.json();
  return productsResponse.data;
}

export function adaptPrintifyProductToProduct(printifyProduct: PrintifyProduct): Product {
    const defaultVariant = printifyProduct.variants.find(v => v.is_default);
    const price = defaultVariant ? defaultVariant.price / 100 : 0;

    return {
        id: printifyProduct.id,
        name: printifyProduct.title,
        description: printifyProduct.description,
        price: price,
        images: printifyProduct.images.map(img => ({
            src: img.src,
            alt: printifyProduct.title,
            width: 1000, // Default width
            height: 1000, // Default height
            hint: printifyProduct.tags.join(' ') || 'product image'
        })),
        category: printifyProduct.tags[0] || 'Uncategorized',
        variants: printifyProduct.options.map(opt => ({
            type: opt.name,
            options: opt.values.map(val => ({
                value: val.title
            }))
        }))
    };
}

export async function getProducts(): Promise<Product[]> {
    const printifyProducts = await getPrintifyProducts();
    return printifyProducts.map(adaptPrintifyProductToProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
    const products = await getProducts();
    return products.find(p => p.id === id) || null;
}
