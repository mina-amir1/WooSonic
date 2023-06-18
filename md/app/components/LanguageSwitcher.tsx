import { useTranslation } from 'react-i18next';
import { useLocation } from '@remix-run/react';

export default function LanguageSwitcher() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  // const history = useHistory();

  function handleChangeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    const newPathname = `/${lang}${pathname}`;
    // history.push(newPathname);
    console.log('newPathname',newPathname)
  }

  return (
    <div>
      <button onClick={() => handleChangeLanguage('en')}>
        {t('languageSwitcher.en')}
      </button>
      <button onClick={() => handleChangeLanguage('ar')}>
        {t('languageSwitcher.ar')}
      </button>
    </div>
  );
}
