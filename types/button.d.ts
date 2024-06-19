import { LucideIcon } from "lucide-react";

// Interface for Button component props
export interface ButtonTypes {
  text: string;
  btnBg?: string;
  icon?: LucideIcon; // Optional icon to display on the button, from Lucide library
  jsxIcon?: any; // Optional JSX icon to display on the button
  iconProps?: React.SVGProps<SVGSVGElement>; // Optional properties to pass to the SVG icon
  link?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
