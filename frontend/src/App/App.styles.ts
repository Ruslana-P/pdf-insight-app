import styled from 'styled-components';

export const Page = styled.main`
  max-width: 40rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
`;

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  font-size: 1.75rem;
  font-weight: 600;
`;

export const Lead = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Instructions = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.lg};
  line-height: 1.6;
`;

export const ErrorText = styled.p`
  margin: ${({ theme }) => theme.space.md} 0 0;
  color: ${({ theme }) => theme.colors.error};
`;

export const FileInfo = styled.p`
  margin: ${({ theme }) => theme.space.md} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
`;

export const StatusText = styled.p`
  margin: ${({ theme }) => theme.space.md} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;
