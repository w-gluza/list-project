import type { ElementType, JSX, ReactNode } from "react";
import type { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

export interface HeadingProps {
  /** Visual/semantic level of the heading (renders h1–h6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Heading content. */
  children: ReactNode;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
}

const Root = styled("h2", {
  margin: 0,
  color: "$black",
  fontWeight: 600,
  variants: {
    level: {
      1: { fontSize: 32, lineHeight: 1.25, letterSpacing: "-0.01em" },
      2: { fontSize: 28, lineHeight: 1.3, letterSpacing: "-0.005em" },
      3: { fontSize: 24, lineHeight: 1.35 },
      4: { fontSize: 20, lineHeight: 1.4 },
      5: { fontSize: 16, lineHeight: 1.45 },
      6: { fontSize: 14, lineHeight: 1.5 },
    },
  },
});

export const Heading = ({ level = 2, children, css }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements as ElementType;

  return (
    <Root as={Tag} level={level} css={css}>
      {children}
    </Root>
  );
};

Heading.displayName = "Heading";
