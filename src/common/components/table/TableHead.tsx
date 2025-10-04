import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableHeadProps {
  /** Table header rows — typically one or more <TableRow> elements. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("thead", {
  borderBottom: "1px solid $gray200",

  "&:last-child": {
    borderBottom: "none",
  },
});

export const TableHead = ({ children, css }: TableHeadProps) => {
  return <Root css={css}>{children}</Root>;
};

TableHead.displayName = "TableHead";
