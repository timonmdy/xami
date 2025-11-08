import clsx from "clsx";

const Star: React.FC<{ filled?: boolean; half?: boolean; className?: string }>
  = ({ filled, half, className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className={clsx("h-6 w-6 transition-transform", className)}
  >
    <defs>
      <linearGradient id="half">
        <stop offset="50%" />
        <stop offset="50%" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      className={clsx(
        filled && "fill-accent",
        !filled && !half && "fill-borders",
        half && "fill-[url(#half)] stroke-accent",
        "stroke-borders"
      )}
      strokeWidth={half ? 1 : 0}
    />
  </svg>
);

export default Star;