interface StepIndicatorProps {
  step: number;
}

const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className="flex gap-6">
      <div className={`font-medium ${step === 1 ? "text-primary" : "text-gray-400"}`}>
        1. Address
      </div>
      <div className={`font-medium ${step === 2 ? "text-primary" : "text-gray-400"}`}>
        2. Review
      </div>
    </div>
  );
};

export default StepIndicator;
