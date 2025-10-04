import { type ReactNode } from "react";

interface TableBodyProps {
  /** Table rows or other valid <tbody> content */
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => {
  return <tbody>{children}</tbody>;
};

TableBody.displayName = "TableBody";
