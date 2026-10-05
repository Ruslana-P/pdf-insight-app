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
  margin: 0 0 ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Notice = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.space.md};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;
