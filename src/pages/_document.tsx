import { Html, Head, Main, NextScript } from 'next/document'
// import dynamic from 'next/dynamic';
import Nav from '@/components/nav';
// const Nav = dynamic(() => import('@/components/nav'), { ssr: false });
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
