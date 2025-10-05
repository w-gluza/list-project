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
  variants: {
    level: {
      1: {
        fontSize: 32,
        lineHeight: "40px",
        letterSpacing: "2%",
        fontWeight: "$medium",
        fontFamily: "$secondary",
      },
      2: {
        fontSize: 24,
        lineHeight: "32px",
        letterSpacing: "0%",
        fontWeight: "$bold",
      },
      // Just a placeholder, should be customized as needed for levels 3-6
      3: { fontSize: 20, lineHeight: 1.5 },
      4: { fontSize: 20, lineHeight: 1.5 },
      5: { fontSize: 20, lineHeight: 1.5 },
      6: { fontSize: 20, lineHeight: 1.5 },
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
