import { useState, useEffect } from 'react';
import '../src/app/globals.css';

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

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [language, setLanguage] = useState('ko');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      content: "한국인의 입맛에 맞는 음식들을 배달해드립니다!",
      bgColor: "bg-blue-500",
    },
    {
      content: "한국인들 리뷰포함 음식점들보러가기",
      bgColor: "bg-yellow-500",
      button: {
        text: "주문하기",
        link: "/order",
      },
    },
    {
      content: "리뷰 남기면 다음 주문시 $1 할인 이벤트! 리뷰 남기러 가기",
      bgColor: "bg-red-500",
      button: {
        text: "바로가기",
        link: "/review",
      },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-cover bg-center bg-gray-700 bg-blend-multiply" style={{ backgroundImage: "url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/coast-house-view.jpg')" }}>
        <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-white lg:py-16 z-1">
          <div className="mb-6 max-w-screen-lg lg:mb-0">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">Delicious and fresh food delivered to your doorstep</h1>
            <p className="mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">Welcome to ManiMuggo, the future of food delivery. Our platform offers real-time order tracking, ensuring your meals arrive fresh and fast. Whether you're a driver seeking flexible work, a restaurant wanting more customers, or someone craving delicious food, ManiMuggo connects you effortlessly. Join us today and experience a new way of food delivery!</p>
            <a href="/restaurants" className="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Order Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
            <a href="#" className="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Download App
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
          </div>           
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">The most trusted food delivery platform</h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">Here are a few reasons why you should choose ManiMuggo</p>
          <div className="mt-8 lg:mt-12 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <svg className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd"></path><path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Easy To Order</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">You only need a few steps in ordering food</p>
            </div>
            <div>
              <svg className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Fastest Delivery</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">Delivery that is always on time even faster</p>
            </div>
            <div>
              <svg className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Best Quality</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">Not only fast for us quality is also number one</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="text-center text-gray-900">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 lg:text-5xl dark:text-white">Become part of ManiMuggo!</h2>
            <a href="#" className="inline-flex items-center text-lg font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              Learn more about careers
              <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </a>
          </div>
          <div className="justify-evenly flex">
            <div className="grid gap-6 mt-12 lg:mt-14 lg:gap-12 md:grid-cols-2">
              <div className="flex mb-2 md:flex-col md:mb-0">
                <img className="mr-4 w-auto h-36 md:w-30 md:h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-1.png" alt="office image" />
                <div>
                  <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900 dark:text-white">Become a driver</h3>
                  <p className="text-gray-500 dark:text-gray-400">Join ManiMuggo as a driver and enjoy flexible hours, rewarding earnings, real-time order tracking, easy navigation, and top-notch support, all while making a positive impact by delivering delicious meals to happy customers.</p>
                </div>
                <a href="/joinDriver" className="py-3 inline-flex items-center text-lg font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                  Register Now
                  <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </a>
              </div>
              <div className="flex mb-2 md:flex-col md:mb-0">
                <img className="mr-4 w-auto h-36 md:w-30 md:h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png" alt="office image 2" />
                <div>
                  <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900 dark:text-white">Register your restaurant</h3>
                  <p className="text-gray-500 dark:text-gray-400">Register your restaurant with ManiMuggo to expand your customer base, increase your sales, and enjoy seamless integration with our real-time order processing and tracking system, ensuring your delicious meals reach satisfied customers quickly and efficiently.</p>
                </div>
                <a href="/registerRestaurant" className="py-3 inline-flex items-center text-lg font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                  Register Now
                  <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Testimonials</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Explore what drivers, restaurants, and customer say about us</p>
          </div> 
          <div id="testimonial-carousel" className="relative" data-carousel="slide">
            <div className="overflow-x-hidden overflow-y-visible relative mx-auto max-w-screen-md h-52 rounded-lg sm:h-48">
              <figure className="hidden mx-auto w-full max-w-screen-md" data-carousel-item>
                <blockquote>
                  <p className="text-lg font-medium text-gray-900 sm:text-2xl dark:text-white">"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center mt-6 space-x-3">
                  <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="profile picture"/>
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-black">Bonnie Green</div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">Web developer at Google</div>
                  </div>
                </figcaption>
              </figure>
              <figure className="hidden mx-auto w-full max-w-screen-md" data-carousel-item>
                <blockquote>
                  <p className="text-lg font-medium text-gray-900 sm:text-2xl dark:text-black">"As someone who mainly designs in the browser, I've been a casual user of Figma, but as soon as I saw and started playing with FlowBite my mind was blown and became so productive."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center mt-6 space-x-3">
                  <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="profile picture"/>
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-black">Helene Engels</div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">Creative designer at Adobe</div>
                  </div>
                </figcaption>
              </figure>
              <figure className="hidden mx-auto w-full max-w-screen-md" data-carousel-item>
                <blockquote>
                  <p className="text-lg font-medium text-gray-900 sm:text-2xl text-black">"Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code, customise it and integrate within a Laravel + Vue application."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center mt-6 space-x-3">
                  <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png" alt="profile picture"/>
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-white">Neil Sims</div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">CTO at Microsoft</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="flex justify-center items-center">
              <button type="button" className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
              <button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="hidden">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 lg:text-5xl dark:text-white">Home to the delicious asian foods</h2>
          <p className="font-light text-gray-500 sm:text-lg sm:px-8 lg:px-32 xl:px-64 dark:text-gray-400">Meet your developers where they already are. GitHub is home to over 40 million developers and the world’s largest open source community.</p>
          <dl className="grid grid-cols-2 gap-8 mx-auto mt-8 max-w-screen-md text-gray-900 lg:mt-14 sm:grid-cols-3 dark:text-white">
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-4xl font-extrabold">5000000+</dt>
              <dd className="text-xl font-normal text-gray-500 dark:text-gray-400">Online Customers</dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-4xl font-extrabold">2000+</dt>
              <dd className="text-xl font-normal text-gray-500 dark:text-gray-400">Restaurants</dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-4xl font-extrabold">1000+</dt>
              <dd className="text-xl font-normal text-gray-500 dark:text-gray-400">Drivers</dd>
            </div>
          </dl>
        </div>
      </section>
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
    </div>
  );
}

