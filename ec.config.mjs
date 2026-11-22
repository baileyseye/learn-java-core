import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
  plugins: [pluginLineNumbers()],
  defaultProps: {
    showLineNumbers: false
  },
  styleOverrides: {
    borderRadius: '0.65rem',
    codeFontSize: '0.9rem',
    uiFontSize: '0.8rem',
    frames: {
      shadowColor: 'transparent'
    }
  }
});
