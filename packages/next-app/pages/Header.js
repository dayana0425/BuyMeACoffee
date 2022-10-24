import Head from "next/head";

function Header() {
  return (
    <Head>
      <title>Hello World</title>
      <meta
        name="description"
        content="A starter project to quickly set up your DApp build on Polygon and with The Graph!🚀"
      />
      <link rel="icon" href="/HolaMundo-NoText.png" />
      <meta property="og:title" content="Hola Mundo" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:site_name" content="Hola Mundo"></meta>
    </Head>
  );
}

export default Header;
