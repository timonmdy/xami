import clsx from "clsx";

const Badge: React.FC<React.ComponentProps<"span">> = ({ className, ...props }) => (
  <span
    {...props}
    className={clsx(
      "inline-flex items-center gap-1 rounded-2xl border border-borders bg-cards px-3 py-1 text-xs text-text-secondary",
      className
    )}
  />
);

export default Badge;