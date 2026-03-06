import {
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";

const Badges = () => {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4 text-primary" />
        Quality Guarantee
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Truck className="h-4 w-4 text-primary" />
        Free Shipping
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 text-primary" />
        10-Day Returns
      </div>
    </div>
  );
};

export default Badges;
