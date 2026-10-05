import styled from 'styled-components';

export const HistorySection = styled.section`
  margin-top: ${({ theme }) => theme.space.xl};
  padding-top: ${({ theme }) => theme.space.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HistoryHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.xs};
  font-size: 1.125rem;
`;

export const HistoryLead = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9375rem;
`;

export const HistoryList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const HistoryItem = styled.li`
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const HistoryItemTitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.xs};
  font-weight: 600;
`;

export const HistoryItemMeta = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
`;

export const HistoryItemSummary = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  line-height: 1.5;
  font-size: 0.9375rem;
`;

export const HistoryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`;

export const HistoryToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;
