import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { vars } from './vars.css';

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '900',
  src: 'url(/fonts/Outfit-Black.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-Black.woff2) format(woff2) , url(/fonts/Outfit-Black.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: 'bold',
  src: 'url(/fonts/Outfit-Bold.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-Bold.woff2) format(woff2) , url(/fonts/Outfit-Bold.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '200',
  src: 'url(/fonts/Outfit-ExtraLight.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-ExtraLight.woff2) format(woff2) , url(/fonts/Outfit-ExtraLight.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '600',
  src: 'url(/fonts/Outfit-SemiBold.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-SemiBold.woff2) format(woff2) , url(/fonts/Outfit-SemiBold.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '500',
  src: 'url(/fonts/Outfit-Medium.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-Medium.woff2) format(woff2) , url(/fonts/Outfit-Medium.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '100',
  src: 'url(/fonts/Outfit-Thin.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-Thin.woff2) format(woff2) , url(/fonts/Outfit-Thin.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '300',
  src: 'url(/fonts/Outfit-Light.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-Light.woff2) format(woff2) , url(/fonts/Outfit-Light.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: 'url(/fonts/Outfit-Regular.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-Regular.woff2) format(woff2) , url(/fonts/Outfit-Regular.woff) format(woff)',
});

globalFontFace('Outfit', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: 'bold',
  src: 'url(/fonts/Outfit-ExtraBold.eot?#iefix) format(embedded-opentype) , url(/fonts/Outfit-ExtraBold.woff2) format(woff2) , url(/fonts/Outfit-ExtraBold.woff) format(woff)',
});

globalFontFace('JetBrains Mono', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: 'url(/fonts/JetBrainsMono-Regular.eot?#iefix) format(embedded-opentype) , url(/fonts/JetBrainsMono-Regular.woff2) format(woff2) , url(/fonts/JetBrainsMono-Regular.woff) format(woff)',
});

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
});

globalStyle('::selection', {
  backgroundColor: 'var(--selectionColor)',
  color: vars.colors.labelWhite,
  WebkitTextFillColor: vars.colors.labelWhite,
});

globalStyle('body', {
  backgroundColor: vars.colors.backgroundElevated,
  color: vars.colors.label,
  fontFamily: 'Outfit, system-ui, Helvetica Neue, Arial, Helvetica, sans-serif',
  fontSize: '100%',
  letterSpacing: 0.35,
  margin: 0,
});

globalStyle('code, pre', {
  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
  fontWeight: 400,
  MozOsxFontSmoothing: 'subpixel-antialiased',
  WebkitFontSmoothing: 'subpixel-antialiased',
});

globalStyle('button', {
  appearance: 'none',
  background: 'transparent',
});

globalStyle('svg', {
  verticalAlign: 'middle',
});

globalStyle('[data-emoji]', {
  fontFamily: 'system-ui',
  fontWeight: 400,
});
