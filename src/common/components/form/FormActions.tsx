import { styled } from "../../styles/stitches.config";
import { type ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
}

const StyledFormActions = styled("div", {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "1fr 3fr",
  paddingTop: "16px",
});

export const FormActions = ({ children }: FormActionsProps) => {
  return <StyledFormActions>{children}</StyledFormActions>;
};

FormActions.displayName = "FormActions";
