import type { ReactNode } from 'react';
import { StyledButton } from './SimpleButton.styles';

export type SimpleButtonProps = {
  children: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  ariaDescribedBy?: string;
};

export function SimpleButton({
  children,
  onClick,
  isDisabled = false,
  ariaDescribedBy,
}: SimpleButtonProps) {
  return (
    <StyledButton
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </StyledButton>
  );
}
