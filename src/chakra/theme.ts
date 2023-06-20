// 1. Import the extendTheme function and fonts
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
export const theme = extendTheme({
  // 2. Extend the theme to include custom colors, fonts, etc
  colors: {
    brand: {
      // 3. These key value pair can be customize to your
      //    hearts content and use it globally.
      100: "#FF3C00",
    },
  },
  fonts: {
    body: "Open Sanse, sans-serif",
  },
  styles: {
    global: () => ({
      //4. This the global background color of the body
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    // 5. import Custom theme for Button etc.
  },
});
