import { type ReactNode } from "react";
import { styled } from "../../../styles/stitches.config";

export interface PageContainerProps {
  /** Content to render inside the container. */
  children: ReactNode;
  /** Extra CSS class name(s). */
  className?: string;
}

const Root = styled("div", {
  width: "100%",
  maxWidth: "960px",
  margin: "0 auto",
  padding: "20px 16px",
});

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return <Root className={className}>{children}</Root>;
};

PageContainer.displayName = "PageContainer";
