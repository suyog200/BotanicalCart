import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface CardData {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName?: string;
  formatValue?: (value: number | string) => string;
}

interface OverviewCardsProps {
  cards: CardData[];
}

const OverviewCards = ({ cards }: OverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        const formattedValue = card.formatValue
          ? card.formatValue(card.value)
          : card.value;

        return (
          <Card
            key={index}
            className="bg-white border-none"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-hero-text-subtitle)]">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-[var(--color-hero-text-heading)]">
                    {formattedValue}
                  </p>
                </div>
                <IconComponent
                  className={`h-8 w-8 ${
                    card.iconClassName || "text-[var(--color-primary)]"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OverviewCards;
