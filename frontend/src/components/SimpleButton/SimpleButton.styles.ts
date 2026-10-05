import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
