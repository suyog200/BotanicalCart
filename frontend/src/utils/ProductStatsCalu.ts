import type { Product } from "@/types/types";



export const calculateProductStats = (products: Product[]) => {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.inStock === true).length;
    const outOfStock = products.filter(p => p.inStock === false).length;
    const featured = products.filter(p => p.isFeatured).length;

    return {
        totalProducts,
        activeProducts,
        outOfStock,
        featured
    };
}