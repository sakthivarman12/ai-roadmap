import { ChecklistItem as ChecklistItemType } from "@/types/learning";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
}

export const ChecklistItem = ({ item, onToggle }: ChecklistItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:bg-secondary/50",
        item.completed 
          ? "bg-primary/5 border-primary/20" 
          : "bg-card border-border hover:border-primary/30"
      )}
      onClick={() => onToggle(item.id)}
    >
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <h4 
          className={cn(
            "font-medium text-base transition-all duration-200",
            item.completed && "line-through text-muted-foreground"
          )}
        >
          {item.title}
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
};
