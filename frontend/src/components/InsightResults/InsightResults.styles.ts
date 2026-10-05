import styled from 'styled-components';

export const ResultsSection = styled.section`
  margin-top: ${({ theme }) => theme.space.lg};
  padding-top: ${({ theme }) => theme.space.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ResultsBlock = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const ResultsHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  font-size: 1.125rem;
`;

export const SubHeading = styled.h3`
  margin: ${({ theme }) => theme.space.md} 0 ${({ theme }) => theme.space.sm};
  font-size: 1rem;
  font-weight: 600;
`;

export const SummaryText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

export const MetaList = styled.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 40%) 1fr;
  gap: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  margin: 0;
`;

export const MetaTerm = styled.dt`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MetaValue = styled.dd`
  margin: 0;
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.space.lg};
`;

export const BulletItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EmptyHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
`;

export const TableHeadCell = styled.th`
  padding: ${({ theme }) => theme.space.sm};
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.space.sm};
  vertical-align: top;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const KeywordList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const KeywordItem = styled.li`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
`;

export const DownloadRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
`;
