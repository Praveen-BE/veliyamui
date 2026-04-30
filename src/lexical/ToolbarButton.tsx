// ToolbarComponents.tsx
import maskStyle from "./maskStyle";
import { btnBase, btnInactive, btnActive, iconBase } from "./ToolbarStyles";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: string;
  isActive?: boolean;
  disabled?: boolean;
  label: string;
}

export const ToolbarButton = ({
  onClick,
  icon,
  isActive,
  disabled,
  label,
}: ToolbarButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${btnBase} ${isActive ? btnActive : btnInactive}`}
    aria-label={label}
    aria-pressed={isActive}
  >
    <i
      className={`${iconBase} ${isActive ? "opacity-100" : "opacity-70"}`}
      style={maskStyle(icon)}
    />
  </button>
);
