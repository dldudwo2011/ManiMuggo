import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

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
  },
};


export default function NavBar(params) {
  const { data: session, status } = useSession();


  useEffect(() => {
    console.log(session, status);
    if (status === 'loading') {
      // You can show a loading spinner here if needed
      console.log('Checking authentication status...');
    } else if (status === 'authenticated') {
      console.log('User is authenticated:', session.user);
    } else {
      console.log('User is not authenticated');
    }
  }, [session, status]);


  try{
    signIn()
  }catch(error){
    console.log(error);
    console.log(error.message);
  }

  const [language, setLanguage] = useState('ko');
    return(<nav class="sticky bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-green-400 ">ManiMuggo</span>
        </a>
        <div class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
        {status === 'loading' ? (
                <li>Loading...</li>
              ) : session ? (
                <>
                  <li>{session.user.name}</li>
                  <li><button onClick={() => signOut()} className="text-gray-800">{translations[language].logout}</button></li>
                </>
              ) : (
                <li><button onClick={() => signIn()} className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-green-400 dark:hover:bg-green-400 dark:hover:text-white">{translations[language].login}</button></li>
              )}
            <button type="button" data-dropdown-toggle="language-dropdown-menu" class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-green-400 dark:hover:bg-green-400 dark:hover:text-white">
              English (US)
            </button>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700" id="language-dropdown-menu">
              <ul class="py-2 font-medium" role="none">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div class="inline-flex items-center">        
                      English (US)
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div class="inline-flex items-center">
                      French
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div class="inline-flex items-center">         
                      한국어
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div class="inline-flex items-center">
                      中文 (繁體)
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="navbar-language" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-language" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
        
          </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 hover:underline">
            <li>
              <a href="/" class="block py-2 px-3 text-black bg-green-400 rounded md:bg-transparent md:text-green-400 md:p-0 md:dark:text-green-400 hover:underline" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-400 dark:text-white md:dark:hover:text-green-400 hover:underline dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ">About</a>
            </li>
            <li>
              <a href="/joinDriver" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-400 dark:text-white md:dark:hover:text-green-400 hover:underline dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ">Careers</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>);
};
