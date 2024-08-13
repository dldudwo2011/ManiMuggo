import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const translations = {
  en: {
    welcome: "Delicious Korean food delivered to your doorstep.",
    partner: "Would you like to partner up with us? Register your restaurant",
    register: "Register your restaurant",
    driver: "Want to become a driver? Register now",
    download: "Download our app",
    home: "Home",
    menu: "Menu",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    go: "Go",
    dashboard: "Dashboard",
  },
  ko: {
    welcome: "한국인들을 위한 음식 배달 전문앱 먹자!",
    partner: "음식점 등록하기",
    register: "음식점 등록하기",
    driver: "배달원이 되고 싶습니까? 지금 등록하세요",
    download: "앱 다운로드",
    home: "홈",
    menu: "메뉴",
    contact: "연락처",
    login: "로그인",
    logout: "로그아웃",
    go: "가기",
    dashboard: "대시보드",
  },
  fr: {
    welcome: "Nourriture coréenne délicieuse livrée à votre porte.",
    partner: "Souhaitez-vous vous associer avec nous ? Enregistrez votre restaurant",
    register: "Enregistrez votre restaurant",
    driver: "Voulez-vous devenir un chauffeur ? Inscrivez-vous maintenant",
    download: "Téléchargez notre application",
    home: "Accueil",
    menu: "Menu",
    contact: "Contact",
    login: "Connexion",
    logout: "Déconnexion",
    go: "Aller",
    dashboard: "Tableau de bord",
  },
};

export default function NavBar() {
  const { data: session, status } = useSession();
  const [language, setLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (<>
    <nav className="sticky top-0 bg-white border-gray-200 dark:bg-gray-900 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-600">ManiMuggo</span>
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          {status === 'loading' ? (
            <li>Loading...</li>
          ) : session ? (
            <div className="relative">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-4 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={session.user.image}
          alt={session.user.name}
        />
      </button>
      {isDropdownOpen && (
        <div
          className="z-50 absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {session.user.name}
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {session.user.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
          ) : (
            <li>
              <button
                onClick={() => signIn()}
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-green-500 dark:hover:bg-green-600"
              >
                {translations[language].login}
              </button>
            </li>
          )}
          <button
            type="button"
            data-dropdown-toggle="language-dropdown-menu"
            className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-green-500 dark:hover:bg-green-600"
          >
            {language === 'en' ? 'English (US)' : language === 'fr' ? 'French' : 'Korean'}
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
            id="language-dropdown-menu"
          >
            <ul className="py-2 font-medium" role="none">
              <li>
                <a
                  href="#"
                  onClick={() => setLanguage('en')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  English (US)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setLanguage('fr')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  French
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setLanguage('ko')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  한국어
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-language"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-language"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-black bg-green-500 rounded md:bg-transparent md:text-green-500 md:p-0 md:dark:text-green-400"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white md:dark:hover:text-green-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/joinDriver"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white md:dark:hover:text-green-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}


