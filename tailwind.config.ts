import { Color } from 'https://deno.land/x/color@v0.3.0/mod.ts';
import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: { 
    container: { 
      center: true,
      screens: {}
    },
    extend: {
      width: {
        "header-laterals": "calc(50% - 100px)"
      },
      colors: {
        "brand": "#BC81FF"
      }
    }
  },
};
