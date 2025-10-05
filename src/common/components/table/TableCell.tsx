import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableCellProps {
  /** Cell content — text, elements, or components. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("td", {
  fontSize: "$md",
  lineHeight: "20px",
  fontWeight: "$regular",
  textAlign: "left",
  color: "$black",

  padding: "10px 0px",
});

export const TableCell = ({ children, css }: TableCellProps) => {
  return <Root css={css}>{children}</Root>;
};

TableCell.displayName = "TableCell";
