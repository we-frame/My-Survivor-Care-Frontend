import { LucideIcon } from "lucide-react";

export interface ButtonTypes {
  text: string;
  btnBg?: string;
  icon?: LucideIcon;
  jsxIcon?: any;
  iconProps?: React.SVGProps<SVGSVGElement>;
  link?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
