import Modal from "../adminComponents/Modal";

// components/form/GenericFormModal.tsx
interface GenericFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function GenericFormModal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
}: GenericFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
      {children} {/* Just render children, don't wrap in additional form */}
    </Modal>
  );
}
