import styled from 'styled-components';
import { sectionDividerTop } from '../../styles/sectionDivider';
import { tabletUploadWidth } from '../../styles/tabletUploadWidth';

export const Instructions = styled.p`
  ${sectionDividerTop}
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1.6;
  text-align: center;
`;

export const ErrorText = styled.p`
  ${tabletUploadWidth}
  margin: ${({ theme }) => theme.space.md} 0 0;
  color: ${({ theme }) => theme.colors.error};
`;

export const FileInfo = styled.p`
  ${tabletUploadWidth}
  margin: ${({ theme }) => theme.space.md} 0 0;
  color: ${({ theme }) => theme.colors.dropzone};
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ActionsRow = styled.div`
  ${tabletUploadWidth}
  margin-top: ${({ theme }) => theme.space.md};

  button {
    width: 100%;
  }
`;

export const StatusText = styled.p`
  ${tabletUploadWidth}
  margin: ${({ theme }) => theme.space.md} 0 0;
  color: ${({ theme }) => theme.colors.dropzone};
`;
