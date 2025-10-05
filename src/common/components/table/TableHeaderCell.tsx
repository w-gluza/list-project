import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableHeaderCellProps {
  /** Header cell content — typically a column title or label. */
  children: ReactNode;
  /** Text alignment for the header cell. */
  align?: "left" | "center" | "right";
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("th", {
  fontSize: "$xs",
  lineHeight: "16px",
  fontWeight: "$regular",
  color: "$dark1",
  padding: "10px 0px",

  "@media (min-width: 600px)": {
    fontSize: "$md",
    lineHeight: "20px",
  },

  variants: {
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },
  },

  defaultVariants: {
    align: "left",
  },
});

export const TableHeaderCell = ({
  children,
  align = "left",
  css,
}: TableHeaderCellProps) => {
  return (
    <Root align={align} css={css}>
      {children}
    </Root>
  );
};

TableHeaderCell.displayName = "TableHeaderCell";
