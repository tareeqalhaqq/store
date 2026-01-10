'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing product recommendations.
 *
 * The flow takes a current product and a list of all available products and returns a list of recommended product IDs.
 * - `getProductRecommendations` - A function that calls the product recommendation flow.
 * - `ProductRecommendationInput` - The input type for the `getProductRecommendations` function.
 * - `ProductRecommendationOutput` - The output type for the `getProductRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  currentProduct: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.string(),
  }).describe('The product the user is currently viewing.'),
  allProducts: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).describe('A list of all available products with their IDs and names.'),
});

export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('An array of product IDs recommended to the user.'),
});

export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const productRecommendationPrompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are an AI assistant that recommends similar products.

  The user is currently viewing the following product:
  - ID: {{{currentProduct.id}}}
  - Name: {{{currentProduct.name}}}
  - Description: {{{currentProduct.description}}}
  - Category: {{{currentProduct.category}}}

  Here is a list of all available products:
  {{#each allProducts}}
  - ID: {{{id}}}, Name: {{{name}}}
  {{/each}}

  Based on the current product, recommend up to 4 similar products from the list.
  Do not recommend the current product itself.
  Return only the product IDs as a JSON array in the recommendedProductIds field.
  Do not include any other text in your response.`,
});

const productRecommendationFlow = ai.defineFlow(
  {
    name: 'productRecommendationFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    if (input.allProducts.length === 0) {
      return { recommendedProductIds: [] };
    }
    const {output} = await productRecommendationPrompt(input);
    return output!;
  }
);
