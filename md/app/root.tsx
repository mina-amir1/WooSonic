import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import styles from './tailwind.[hash].css';
import stylesRtl from './tailwind.rtl.[hash].css';
import stylesBase from './base.css';
import criticalCSS from './critical.css';
import stylesSlick from 'slick-carousel/slick/slick.css';
import stylesSlickTheme from 'slick-carousel/slick/slick-theme.css';
import Footer from "./layouts/footer";
import NavBar from "./layouts/navbar";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./components/LanguageSwitcher";
import { initFacebookPixel } from './fb-pixel';
import { FB_PIXELCODE } from "./config";
import { CurrencyProvider } from "./CurrencyContext";



export const links = () => {
  const isSingleProductPage = typeof window !== "undefined" && window.location.pathname.startsWith("/products/");

  return [
    { rel: 'preload', as: 'style', href: criticalCSS },
    { rel: 'preload', as: 'style', href: stylesBase },
    isSingleProductPage ? { rel: 'preload', as: 'style', href: stylesSlick } : null,
    isSingleProductPage ? { rel: 'preload', as: 'style', href: stylesSlickTheme } : null,
    { rel: 'stylesheet', href: criticalCSS },
    { rel: 'stylesheet', href: stylesBase },
    isSingleProductPage ? { rel: 'stylesheet', href: stylesSlick } : null,
    isSingleProductPage ? { rel: 'stylesheet', href: stylesSlickTheme } : null
  ].filter(Boolean);
}

export const meta = () => ({
  charset: "utf-8",
  title: "PWA",
  viewport: "width=device-width,initial-scale=1",
});


export default function App() {
  const [language, setLanguage] = useState(i18n.language);

  const { t } = useTranslation();

  const [isRtl, setIsRtl] = useState(false);
  // console.log('Root i18n.language ', i18n.language);
  if (typeof window !== "undefined") {
    initFacebookPixel(FB_PIXELCODE);
  }

  console.log('NODE_ENV', process.env.NODE_ENV);
  // const mainRef = useRef(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function calculateMainHeight() {
      const screenHeight = window.innerHeight;
      const navbarElement = document.querySelector('header');
      const footerElement = document.querySelector('footer');
    
      if (navbarElement && footerElement && mainRef.current) {
        const navbarHeight = navbarElement.offsetHeight;
        const footerHeight = footerElement.offsetHeight;
        const minHeight = 700; // Specify your desired minimum height here
        const mainHeight = Math.max(screenHeight - navbarHeight - footerHeight, minHeight);
        mainRef.current.style.minHeight = `${mainHeight}px`;
      }
    }
    

    if (typeof window !== 'undefined') {
      calculateMainHeight();
      window.addEventListener('resize', calculateMainHeight);

      return () => {
        window.removeEventListener('resize', calculateMainHeight);
      };
    }
  }, []);

  return (
    <CurrencyProvider>
    <html lang={language} dir={i18n.language === "ar" ? 'rtl' : 'ltr'}>
      <head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700;800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <Links />
        <link rel="stylesheet" href={i18n.language === "ar" ? stylesRtl : styles} />
      </head>
      <body className={`box-border oultine-none ${i18n.language === "ar" ? 'font-sans-ar rtl' : 'font-sans-en ltr'}`}>
        <NavBar
        />
        <main className="relative z-10 bg-gray-100" ref={mainRef}>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html >
    </CurrencyProvider>
  );
}

// const error: string = "Error message";
interface Props {
  error: Error | null
}
export function ErrorBoundary({ error }: Props) {
  // debugger;
  console.error(error);
  if (error) {
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          {/* add the UI you want your users to see */}
          {/* {error} */}
          {error.message}
          <Scripts />
        </body>
      </html>
    )
  }
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html className="h-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
        <link rel="stylesheet" href={i18n.language === "ar" ? stylesRtl : styles} />
      </head>
      <body className="h-full">
        <main
          className="min-h-full bg-center bg-cover sm:bg-center"
          style={{
            backgroundImage:
              'url("/images/404.jpg")',
          }}
        >
          <div className="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <p className="text-sm font-semibold tracking-wide text-black text-opacity-50 uppercase">{caught.status} {caught.statusText}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Uh oh! I think you’re lost.
            </h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              It looks like the page you’re looking for doesn't exist.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-black text-opacity-75 bg-white bg-opacity-75 border border-transparent rounded-md sm:bg-opacity-25 sm:hover:bg-opacity-50"
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}