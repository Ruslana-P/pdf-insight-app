import styled from 'styled-components';

export const Root = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
  margin: 0;
  padding: ${({ theme }) => theme.space.md};
  font: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(158, 255, 0, 0.06);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Chevron = styled.span<{ $expanded: boolean }>`
  flex-shrink: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.buttonText};
  transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
  transition: transform 0.15s ease;
`;

export const Panel = styled.div`
  padding: 0 ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.md};
`;

export const AccordionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;
