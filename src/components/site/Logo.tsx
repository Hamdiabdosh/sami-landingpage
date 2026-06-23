import logo from "@/assets/logo.png";

interface Props {
  size?: number;
  showWordmark?: boolean;
  tone?: "light" | "dark";
}

export function Logo({ size = 36, showWordmark = true, tone = "dark" }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logo}
        alt="Sami General Trading logo"
        width={size}
        height={size}
        className="rounded-md transition-[width,height] duration-300 ease-out"
        style={{ width: size, height: size }}
      />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: size * 0.5,
              color: tone === "light" ? "var(--color-steel-foreground)" : "var(--color-foreground)",
            }}
          >
            SAMI
          </span>
          <span
            className="font-display text-[10px] tracking-[0.22em] uppercase mt-0.5"
            style={{ color: "var(--color-gold)" }}
          >
            General Trading
          </span>
        </div>
      )}
    </div>
  );
}
