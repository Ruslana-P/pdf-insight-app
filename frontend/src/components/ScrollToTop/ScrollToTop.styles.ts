import styled from 'styled-components';

export const ScrollToTopButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  right: ${({ theme }) => theme.space.md};
  bottom: ${({ theme }) => theme.space.md};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  color: #060608;
  background: ${({ theme }) => theme.colors.dropzone};
  border: 2px solid ${({ theme }) => theme.colors.dropzone};
  border-radius: 50%;
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease,
    background 0.15s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.buttonBorder};
    outline-offset: 2px;
  }
`;
