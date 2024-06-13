import { useSession, signIn, signOut } from "next-auth/react"
import Geolocation from '../components/Geolocation';
import { useState} from 'react';
import "../src/app/globals.css"
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
    go: "Go"
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
    go: "가기"
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
    go: "Aller"
  }
};

export default function Home() {
  const { data: session, status } = useSession();

  const [restaurants, setRestaurants] = useState([]);
  const [language, setLanguage] = useState('en');

  const fetchRestaurants = async (location) => {
    const response = await fetch(`/api/restaurants?lat=${location.latitude}&lon=${location.longitude}`);
    const data = await response.json();
    setRestaurants(data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-yellow-400 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="먹자 Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold ml-2">먹자</span>
          </div>
          <nav className="flex items-center">
            <a href="#" className="text-lg font-semibold hover:text-yellow-700 mx-4">{translations[language].home}</a>
            <a href="#" className="text-lg font-semibold hover:text-yellow-700 mx-4">{translations[language].menu}</a>
            <a href="#" className="text-lg font-semibold hover:text-yellow-700 mx-4">{translations[language].contact}</a>
            {!session && (
              <button onClick={() => signIn()} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
                {translations[language].login}
              </button>
            )}
            {session && (
              <button onClick={() => signOut()} className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600">
                {translations[language].logout}
              </button>
            )}
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              className="bg-white text-gray-900 py-2 px-4 rounded-lg shadow-md ml-4"
            >
              <option value="en">English</option>
              <option value="ko">한국어</option>
              <option value="fr">Français</option>
            </select>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-8 flex flex-col items-center flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center">{translations[language].welcome}</h1>
        <p className="text-lg mb-8 text-center">{translations[language].welcome}</p>
        {!session && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">{translations[language].login}</h2>
            <button onClick={() => signIn('google')} className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 mb-4 flex items-center justify-center">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" className="mr-2" />
              Login with Google
            </button>
            <button onClick={() => signIn('apple')} className="w-full bg-gray-900 text-white py-2 rounded-lg shadow-md hover:bg-gray-800 flex items-center justify-center">
              <img src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png" alt="Apple Logo" className="mr-2" />
              Login with Apple
            </button>
          </div>
        )}
        {session && (
          <div className="w-full max-w-md">
            <Geolocation onLocationFetched={fetchRestaurants} />
            <div className="mt-6">
              {restaurants.length > 0 ? (
                <ul className="bg-white p-6 rounded-lg shadow-md">
                  {restaurants.map((restaurant) => (
                    <li key={restaurant.id} className="border-b last:border-b-0 p-4">
                      {restaurant.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No restaurants found in your location.</p>
              )}
            </div>
          </div>
        )}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-full max-w-md mt-8 text-center">
          <p className="text-xl font-semibold mb-4">{translations[language].partner}</p>
          <p className="text-xl font-semibold mb-4">{translations[language].register}</p>
          <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 inline-block">{translations[language].go}</a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-full max-w-md mt-8 text-center">
          <p className="text-xl font-semibold mb-4">{translations[language].driver}</p>
          <a href="/driver" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 inline-block">{translations[language].go}</a>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-full max-w-md mt-8 text-center">
          <p className="text-xl font-semibold mb-4">{translations[language].download}</p>
          <a href="/download/ios" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 inline-block mb-4">Download iOS App</a>
          <a href="/download/android" className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 inline-block">Download Android App</a>
        </div>
      </main>
      <footer className="bg-yellow-400 text-center p-4 mt-auto">
        <p>&copy; 2024 먹자. All rights reserved.</p>
      </footer>
    </div>
  )
}
