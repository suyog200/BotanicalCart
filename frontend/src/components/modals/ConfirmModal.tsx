import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  question: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  question,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false,
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby={description ? "confirm-desc" : undefined}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in"
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isDestructive ? "bg-red-100" : "bg-yellow-100"
        }`}>
          <AlertTriangle className={`w-6 h-6 ${isDestructive ? "text-red-600" : "text-yellow-600"}`} />
        </div>

        {/* Text */}
        <h3 id="confirm-title" className="text-lg font-semibold text-gray-900 text-center mb-2">
          {question}
        </h3>
        {description && (
          <p id="confirm-desc" className="text-sm text-gray-500 text-center mb-6">
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isPending ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};