
interface ProductNameFieldProps {
  register: any;
  error?: string;
}

export const ProductNameField = ({ register, error }: ProductNameFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
      Product Name <span className="text-red-500">*</span>
    </label>
    <input
      {...register("name")}
      type="text"
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder="Enter product name"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);