import { RemixBrowser } from "@remix-run/react";
// import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';


// Language JSON files
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import App from "./root";
import { StrictMode } from "react";

// Configure i18n
i18n.use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

// Wrap the App component with the I18nextProvider
const Root = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <StrictMode>
        <App />
      </StrictMode>
    </I18nextProvider>
  );
};

// Hydrate the app
hydrateRoot(document, <RemixBrowser>{() => <Root />}</RemixBrowser>);