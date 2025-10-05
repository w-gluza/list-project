import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "../../styles/stitches.config";
import type { CSS } from "@stitches/react";
import { TriangleDownIcon, CheckIcon } from "@radix-ui/react-icons";

export interface SelectProps {
  /** Optional label text displayed above the select. */
  label?: string;
  /** Optional validation error message. */
  error?: string;
  /** Optional helper text shown when there’s no error. */
  helperText?: string;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
  /** Controlled value. */
  value?: string;
  /** Called when selection changes. */
  onValueChange?: (value: string) => void;
  /** Options to render. */
  items: Array<{ value: string; label: string; disabled?: boolean }>;
  /** Disabled state. */
  disabled?: boolean;
  /** Stitches CSS object for inline overrides. */
  css?: CSS;
  /** Optional id for the trigger (auto-generated if omitted). */
  id?: string;
  /** Optional test id. */
  dataTestId?: string;
}

const Wrapper = styled("label", { display: "grid", gap: 6 });

const Row = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

const LabelEl = styled("div", {
  fontSize: "$sm",
  fontWeight: "$regular",
  color: "$dark1",
});

const Message = styled("span", {
  fontSize: "$xs",
  minHeight: 16,
  lineHeight: 1.3,
});

const Trigger = styled(SelectPrimitive.Trigger, {
  width: "100%",
  height: 40,
  padding: "0 12px",
  borderRadius: "$radius-md",
  border: "2px solid $surface3",
  backgroundColor: "$white",
  color: "$black",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  transition: "border-color 0.15s ease, background-color 0.15s ease",

  "&:focus-visible": {
    outline: "none",
    borderColor: "$dark1",
  },

  "&[data-disabled='true']": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  variants: {
    error: {
      true: { borderColor: "$danger" },
    },
  },
});

const Content = styled(SelectPrimitive.Content, {
  backgroundColor: "$white",
  border: "1px solid $surface3",
  borderRadius: "$radius-md",
  overflow: "hidden",
  minWidth: "var(--radix-select-trigger-width)",
  width: "var(--radix-select-trigger-width)",
});

const Viewport = styled(SelectPrimitive.Viewport, {
  padding: 4,
  width: "100%",
});

const Item = styled(SelectPrimitive.Item, {
  fontSize: "$sm",
  color: "$black",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  height: 36,
  padding: "0 10px",
  userSelect: "none",
  cursor: "pointer",
  width: "100%",
  position: "relative",

  "&[data-disabled='true']": {
    opacity: 0.5,
    pointerEvents: "none",
  },

  "&:hover": {
    backgroundColor: "$surface2",
  },

  "&[data-highlighted='true']": {
    backgroundColor: "$surface2",
  },
});

const ItemText = styled(SelectPrimitive.ItemText, { flex: 1 });
const ItemIndicator = styled(SelectPrimitive.ItemIndicator, { marginLeft: 8 });

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      placeholder = "Select…",
      value,
      onValueChange,
      items,
      disabled,
      css,
      id,
      dataTestId,
    },
    ref
  ) => {
    const autoId = React.useId();
    const triggerId = id ?? autoId;
    const msgId = `${triggerId}-msg`;
    const hasError = Boolean(error);
    const message = error ?? helperText ?? "";

    return (
      <Wrapper css={css}>
        {(label || message) && (
          <Row>
            {label ? (
              <LabelEl as="label" htmlFor={triggerId}>
                {label}
              </LabelEl>
            ) : (
              <span />
            )}
            <Message
              id={msgId}
              role={hasError ? "alert" : undefined}
              css={{ color: hasError ? "$danger" : "$dark1" }}
            >
              {message}
            </Message>
          </Row>
        )}

        <SelectPrimitive.Root
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <Trigger
            id={triggerId}
            ref={ref}
            aria-describedby={msgId}
            data-testid={dataTestId}
            data-disabled={disabled ? "true" : undefined}
            error={hasError}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <TriangleDownIcon />
            </SelectPrimitive.Icon>
          </Trigger>

          <SelectPrimitive.Portal>
            <Content position="popper">
              <Viewport>
                {items.map((opt) => (
                  <Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    <ItemText>{opt.label}</ItemText>
                    <ItemIndicator>
                      <CheckIcon />
                    </ItemIndicator>
                  </Item>
                ))}
              </Viewport>
            </Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </Wrapper>
    );
  }
);

Select.displayName = "Select";
