import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  color: ${({ theme }) => theme.colors.buttonText};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.buttonBorder};
  border-radius: 0;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(158, 255, 0, 0.08);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
