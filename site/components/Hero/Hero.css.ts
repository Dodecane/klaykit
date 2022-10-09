/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';

export const MODAL_SIZE = {
  width: 2490,
  height: 1842,
};

export const MODAL_COMPACT_SIZE = {
  width: 1433,
  height: 1333,
};

export const heroWrapper = style([
  {
    pointerEvents: 'none',
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
]);

export const modalWrapper = style([
  atoms({ display: { xs: 'none', md: 'none', lg: 'block' } }),
  {
    maxWidth: 800,
  },
]);

export const compactModalWrapper = style([
  responsiveStyle({
    xs: { display: 'none' },
    md: {
      display: 'block',
      maxWidth: 410,
      position: 'relative',
      top: 0,
      marginBottom: 0,
    },
    lg: {
      display: 'block',
      maxWidth: 430,
      position: 'relative',
      top: 100,
      marginLeft: -290,
      marginBottom: 0,
    },
  }),
]);
