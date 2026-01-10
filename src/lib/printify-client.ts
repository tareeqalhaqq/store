"use client";
import type { Product } from "./types";

// This is a client-side utility for fetching product data
// It calls our own API route, which then calls Printify.
// This avoids exposing the Printify API key to the client.
export async function getProduct(id: string): Promise<Product | null> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) {
        // You might want to handle different statuses differently
        console.error(`Failed to fetch product ${id}: ${res.statusText}`);
        return null;
    }
    return res.json();
}
