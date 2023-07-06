import { Global, css } from '@emotion/react';
import reset from 'emotion-reset';

export const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      ${reset}

      * {
        box-sizing: border-box;
        word-break: keep-all;
      }

      a {
        text-decoration: none;
        cursor: pointer;
      }

      input,
      button {
        outline: 0;
        background-color: transparent;
      }

      button {
        cursor: pointer;
      }
    `}
  />
);
