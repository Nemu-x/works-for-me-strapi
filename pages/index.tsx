import { ChakraProvider, Container, ColorModeScript } from '@chakra-ui/react';
import Head from 'next/head';
import FAQSection from '../components/FAQSection';
import theme from '../theme';

export default function Home() {
  return (
    <>
      <Head>
        <title>Resource Hub - Interactive FAQ System</title>
        <meta name="description" content="A modern, interactive FAQ system and resource hub with dark mode support, searchable content, and categorized information display." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Container maxW="container.xl" p={0}>
          <FAQSection />
        </Container>
      </ChakraProvider>
    </>
  );
} 