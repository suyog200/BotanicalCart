// components/form/PriceStockFields.tsx
interface PriceStockFieldsProps {
  register: any;
  errors: { price?: string; stock?: string };
}

export const PriceStockField = ({ register, errors }: PriceStockFieldsProps) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
        Price (₹) <span className="text-red-500">*</span>
      </label>
      <input
        {...register("price")}
        type="number"
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
          errors.price ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="0.00"
        min="0"
        step="0.01"
      />
      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
        Stock Quantity <span className="text-red-500">*</span>
      </label>
      <input
        {...register("stock")}
        type="number"
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
          errors.stock ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="0"
        min="0"
      />
      {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
    </div>
  </div>
);