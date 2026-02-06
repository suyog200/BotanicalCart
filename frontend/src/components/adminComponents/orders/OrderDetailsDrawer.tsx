import OrderDetails from "../OrderDetails";

interface Props {
  orderId: string | null;
  onClose: () => void;
}

export const OrderDetailsDrawer = ({ orderId, onClose }: Props) => {
  if (!orderId) return null;

  return <OrderDetails orderId={orderId} onClose={onClose} />;
};
