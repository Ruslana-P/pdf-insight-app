import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const DropArea = styled.div<{
  $isInputDisabled: boolean;
  $dragActive: boolean;
}>`
  box-sizing: border-box;
  width: 12rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 2px solid red;
  background: ${({ theme, $dragActive }) =>
    $dragActive ? theme.colors.surface : 'transparent'};
  opacity: ${({ $isInputDisabled }) => ($isInputDisabled ? 0.6 : 1)};
  pointer-events: ${({ $isInputDisabled }) => ($isInputDisabled ? 'none' : 'auto')};
`;
