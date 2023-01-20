import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body className='overflow-hidden bg-dark'>
        <svg stroke="#E766DA" className="absolute stroke-[5px] h-full w-auto right-[-300px] z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 609.35 842.38">
          <path fill="transparent" d="M68.56,842S-95.06,697.68,85.08,448.74,311.32.11,311.32.11"/>
          <path fill="transparent" d="M151.75.11c4.25,21-122.7,420.26,14.89,477.71S609.2,435.27,609.2,435.27"/>
          <path fill="transparent" d="M155.91,842S140,375,366.2,679.24"/>
        </svg>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
