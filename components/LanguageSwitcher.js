import { useRouter } from 'next/router';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (locale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-green-400 dark:hover:bg-green-400 dark:hover:text-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Language
      </button>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => changeLanguage('en')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">English (US)</button>
            <button onClick={() => changeLanguage('ko')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Korean</button>
            <button onClick={() => changeLanguage('fr')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">French</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
