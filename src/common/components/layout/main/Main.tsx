import { type ReactNode } from "react";
import { styled } from "../../../styles/stitches.config";

export interface MainProps {
  /** Content to render inside the main region. */
  children: ReactNode;
  /** Extra CSS class name(s). */
  className?: string;
}

const Root = styled("main", {
  width: "100%",
  padding: "20px 16px",
});

export const Main = ({ children, className }: MainProps) => {
  return <Root className={className}>{children}</Root>;
};

Main.displayName = "Main";
