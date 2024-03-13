import { extendTheme } from "@chakra-ui/react";

const ChakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'black',
      },
      html: {
        height: '100%'
      }
    }
  }
});

export default ChakraTheme;