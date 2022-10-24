import Head from "next/head";

function Header() {
  return (
    <Head>
      <title>Buy Me A Coffee</title>
      <meta
        name="description"
        content="A DApp for my supporters to buy me coffee with crypto.💕"/>
      <link rel="icon" href="/BuyMeCoffee.png" />
      <meta property="og:title" content="Buy Me Coffee" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:site_name" content="Buy Me Coffee"></meta>
    </Head>
    
  );
}

export default Header;
