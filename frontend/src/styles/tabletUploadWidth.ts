import { css } from 'styled-components';
import { media } from './media';

/** Upload flow column width from tablet breakpoint (matches drop zone). */
export const tabletUploadWidth = css`
  width: 100%;

  ${media.tablet} {
    width: 65%;
    margin-inline: auto;
  }

  ${media.web} {
    width: 100%;
    max-width: 650px;
  }
`;
