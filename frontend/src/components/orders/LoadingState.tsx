import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
      <p className="text-lg text-gray-600 font-medium">
        Loading your orders...
      </p>
    </div>
  );
};

export default LoadingState;