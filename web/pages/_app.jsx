/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/NProgress.css';

import { ChakraProvider } from '@chakra-ui/react';

import NProgress from '../components/NProgress';
import UserContextProvider from '../components/UserProvider';
import scrollPreserver from '../utils/scrollPreserver';

const App = ({ Component, pageProps }) => {
  scrollPreserver();

  return (
    <UserContextProvider>
      <ChakraProvider>
        <NProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  );
};

export default App;
