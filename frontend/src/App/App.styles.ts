import styled from 'styled-components';
import { media } from '../styles/media';

export const Page = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};

  ${media.tablet} {
    padding-left: ${({ theme }) => theme.space.lg};
    padding-right: ${({ theme }) => theme.space.lg};
  }

  ${media.web} {
    padding-left: ${({ theme }) => theme.space.xl};
    padding-right: ${({ theme }) => theme.space.xl};
  }
`;

export const Hero = styled.header`
  padding-left: ${({ theme }) => theme.space.md};
  border-left: 4px solid ${({ theme }) => theme.colors.buttonBorder};
`;

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.md};
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(2.25rem, 6vw, 3.25rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.buttonBorder};

  ${media.web} {
    font-size: 3.5rem;
  }
`;

export const Lead = styled.p`
  margin: 0;
  max-width: 36rem;
  font-size: 1.0625rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};

  ${media.tablet} {
    font-size: 1.125rem;
  }
`;

export const LeadEmphasis = styled.span`
  color: ${({ theme }) => theme.colors.buttonText};
  font-weight: 600;
`;
