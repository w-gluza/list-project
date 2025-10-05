import { styled } from "../../styles/stitches.config";
import { type ReactNode } from "react";

interface TableBodyProps {
  /** Table rows (ignored when loading or empty) */
  children?: ReactNode;
  /** Whether the table is loading */
  isLoading?: boolean;
  /** Whether the table has no data */
  isEmpty?: boolean;
  /** Number of columns to span */
  colSpan?: number;
}

const MessageCell = styled("td", {
  textAlign: "center",
  padding: "32px",
  fontFamily: "$primary",
  fontSize: "$md",
  color: "$dark1",
});

export const TableBody = ({
  children,
  isLoading,
  isEmpty,
  colSpan = 1,
}: TableBodyProps) => {
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <MessageCell colSpan={colSpan}>Loading, please wait…</MessageCell>
        </tr>
      </tbody>
    );
  }

  if (isEmpty) {
    return (
      <tbody>
        <tr>
          <MessageCell colSpan={colSpan}>No results found.</MessageCell>
        </tr>
      </tbody>
    );
  }

  return <tbody>{children}</tbody>;
};

TableBody.displayName = "TableBody";
