import clsx from "clsx";
import { useState } from "react";
import Star from "./Star";

const StarRating: React.FC<{
  value?: number;
  onChange?: (val: number) => void;
  className?: string;
}> = ({ value = 0, onChange, className }) => {
  const [hover, setHover] = useState<number | null>(null);
  const current = hover ?? value;
  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const filled = current >= idx;
        const half = !filled && current > i && current < idx;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Rate ${idx} star${idx > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange?.(idx)}
            className="group"
          >
            <Star filled={filled} half={half} className="group-active:scale-95" />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-text-secondary">{current.toFixed(1)} / 5</span>
    </div>
  );
};

export default StarRating;