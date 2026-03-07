import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

// components/form/DynamicFieldArray.tsx
interface DynamicFieldArrayProps {
  fields: any[];
  register: any;
  append: (value: {value: string}) => void;
  remove: (index: number) => void;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  showBulletPoints?: boolean;
}

export const DynamicFieldArray = ({
  fields,
  register, 
  append,
  remove,
  name,
  label,
  placeholder,
  error,
  showBulletPoints = false
}: DynamicFieldArrayProps) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm font-medium text-[var(--color-hero-text-heading)]">
        {label} <span className="text-red-500">*</span>
      </label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ value: "" })}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Add {label.slice(0, -1)}
      </Button>
    </div>

    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          {showBulletPoints && <span className="text-sm text-gray-500 font-medium">•</span>}
          <input
            {...register(`${name}.${index}.value`)}
            type="text"
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border-gray-300"
          />
          {fields.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              className="h-10 w-10 p-0 text-red-500 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);