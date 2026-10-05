import styled from 'styled-components';
import { media } from './media';

/** Bebas display heading (smaller variant of app title). */
export const SectionDisplayTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.buttonBorder};

  ${media.web} {
    font-size: 2.25rem;
  }
`;
