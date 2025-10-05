import { type ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

interface TableCellProps {
  /** Cell content — text, elements, or components. */
  children: ReactNode;
  /** Text alignment for the cell. */
  align?: "left" | "center" | "right";
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("td", {
  fontSize: "$xs",
  lineHeight: "16px",
  fontWeight: "$regular",
  color: "$black",
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
});

export const TableCell = ({
  children,
  align = "left",
  css,
}: TableCellProps) => {
  return (
    <Root align={align} css={css}>
      {children}
    </Root>
  );
};

TableCell.displayName = "TableCell";
