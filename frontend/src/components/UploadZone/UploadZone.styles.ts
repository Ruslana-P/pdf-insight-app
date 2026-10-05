import styled from 'styled-components';
import { tabletUploadWidth } from '../../styles/tabletUploadWidth';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.space.md};
  ${tabletUploadWidth}
`;

export const UploadButtonWrap = styled.div`
  width: 100%;

  button {
    width: 100%;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const DropArea = styled.div<{
  $isInputDisabled: boolean;
  $dragActive: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.dropzone};
  border: 2px solid ${({ theme }) => theme.colors.dropzone};
  border-radius: 0;
  background: ${({ theme, $dragActive }) =>
    $dragActive ? theme.colors.surface : 'transparent'};
  opacity: ${({ $isInputDisabled }) => ($isInputDisabled ? 0.6 : 1)};
  pointer-events: ${({ $isInputDisabled }) => ($isInputDisabled ? 'none' : 'auto')};
`;
