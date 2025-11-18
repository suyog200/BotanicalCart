import CheckboxField from "./CheckboxField";

interface CheckboxOption {
  name: string;
  label: string;
  description?: string;
  defaultValue?: boolean;
}

interface CheckboxGroupFieldProps {
  options: CheckboxOption[];
  register: any;
  errors?: Record<string, string>;
  title?: string;
  className?: string;
}

const CheckboxGroupField = ({
  options,
  register,
  errors = {},
  title,
  className = ""
}: CheckboxGroupFieldProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-[var(--color-hero-text-heading)]">
          {title}
        </h3>
      )}
      
      <div className="space-y-3">
        {options.map((option) => (
          <CheckboxField
            key={option.name}
            {...register(option.name)}
            id={option.name}
            label={option.label}
            description={option.description}
            error={errors[option.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroupField;