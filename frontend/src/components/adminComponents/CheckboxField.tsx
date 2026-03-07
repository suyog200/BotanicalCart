import { forwardRef } from "react";

interface CheckboxFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, description, error, required = false, className = "", ...props }, ref) => {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className={`
                h-4 w-4 rounded border-2 text-[var(--color-primary)] 
                focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
                ${error ? "border-red-500" : "border-gray-300"}
              `}
              {...props}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <label 
              htmlFor={props.id} 
              className="text-sm font-medium text-[var(--color-hero-text-heading)] cursor-pointer"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {description && (
              <p className="text-sm text-[var(--color-hero-text-subtitle)] mt-1">
                {description}
              </p>
            )}
            
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";

export default CheckboxField;