import { Global, css } from '@emotion/react';

export const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
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
