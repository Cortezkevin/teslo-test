import Head from "next/head"
import { FC, ReactElement } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
    children: ReactElement | ReactElement[];
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout:FC<Props>= ({ title, pageDescription, imageFullUrl, children }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ pageDescription } />
        <meta name="og:title" content={ title } />
        <meta name="og:description" content={ pageDescription } />

        {
          imageFullUrl && (
            <meta name="og:image" content={ imageFullUrl } />
          )
        }
      </Head>
      <Navbar />
      <SideMenu />
      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        { children }
      </main>
      <footer>

      </footer>
    </>
  )
}
