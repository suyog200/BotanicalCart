import { Badge, Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

// components/form/MultiSelectDropdown.tsx
interface MultiSelectDropdownProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  options: T[];
  placeholder: string;
  label: string;
  error?: string;
  renderOption?: (option: T) => string;
  renderBadge?: (option: T) => React.ReactNode;
}

export function MultiSelectDropdown<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  label,
  error,
  renderOption = (option) => option,
  renderBadge = (option) => option,
}: MultiSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      
      <div className="relative">
        <div
          className={`min-h-[42px] px-3 py-2 border rounded-lg cursor-pointer flex items-center justify-between ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1">
            {value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.map((item, index) => (
                  <Badge key={index} fontVariant="secondary" className="bg-[var(--color-primary)] text-white text-xs">
                    {renderBadge(item)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(value.filter((_, i) => i !== index));
                      }}
                      className="ml-1 hover:bg-red-500 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {options.map((option) => {
              const isSelected = value.includes(option);
              return (
                <div
                  key={option}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => {
                    if (isSelected) {
                      onChange(value.filter(item => item !== option));
                    } else {
                      onChange([...value, option]);
                    }
                  }}
                >
                  <span className={isSelected ? "text-[var(--color-primary)] font-medium" : "text-gray-700"}>
                    {renderOption(option)}
                  </span>
                  {isSelected && <Check className="h-4 w-4 text-[var(--color-primary)]" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}