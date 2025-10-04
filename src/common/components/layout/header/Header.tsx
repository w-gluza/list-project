import { type ReactNode } from "react";
import { styled } from "../../../styles/stitches.config";

export interface HeaderProps {
  /** Content to render inside the header. */
  children: ReactNode;
  /** Extra CSS class name(s). */
  className?: string;
}

const Root = styled("header", {
  width: "100%",
  backgroundColor: "$white",
  borderBottom: "1px solid $surface3",
});

export const Header = ({ children, className }: HeaderProps) => {
  return <Root className={className}>{children}</Root>;
};

Header.displayName = "Header";
