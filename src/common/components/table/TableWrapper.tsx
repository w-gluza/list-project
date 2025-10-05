import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableWrapperProps {
  /** Entire table structure or related content. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("div", {
  backgroundColor: "$white",
  borderRadius: "$radius-lg",
  padding: "16px",
  overflow: "hidden",
  border: "1px solid $surface2",

  "@media (min-width: 600px)": {
    padding: "24px",
  },
});

export const TableWrapper = ({ children, css }: TableWrapperProps) => {
  return <Root css={css}>{children}</Root>;
};

TableWrapper.displayName = "TableWrapper";
