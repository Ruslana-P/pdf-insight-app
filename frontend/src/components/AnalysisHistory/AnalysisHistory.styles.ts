import styled from 'styled-components';
import { media } from '../../styles/media';
import { sectionDividerTop } from '../../styles/sectionDivider';

export const HistorySection = styled.section`
  ${sectionDividerTop}
`;

export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
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

  ${media.tablet} {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: ${({ theme }) => theme.space.md};
    align-items: start;
  }
`;

export const HistoryItemTitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.xs};
  font-weight: 600;
  overflow-wrap: anywhere;
  word-break: break-word;

  ${media.tablet} {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const HistoryItemMeta = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;

  ${media.tablet} {
    grid-column: 1;
    grid-row: 2;
    margin-bottom: 0;
  }
`;

export const HistoryItemSummary = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  line-height: 1.5;
  font-size: 0.9375rem;

  ${media.tablet} {
    grid-column: 1 / -1;
    grid-row: 3;
    margin-top: ${({ theme }) => theme.space.sm};
    margin-bottom: 0;
  }
`;

export const HistoryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};

  ${media.tablet} {
    grid-column: 2;
    grid-row: 1 / 3;
    justify-self: end;
    align-self: start;
  }
`;
