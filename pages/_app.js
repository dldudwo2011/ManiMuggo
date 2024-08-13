import { SessionProvider, useSession } from 'next-auth/react';
import { appWithTranslation } from 'i18next';
import '../src/app/globals.css';
import RestaurantsNavBar from '../components/RestaurantsNavBar';
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

function MyAppContent({ Component, pageProps }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isRestaurantsRoute = router.pathname.startsWith('/restaurants');

  // Check if the current route is either /dashboard or /driver
  const isRestrictedRoute = ['/dashboard', '/driver'].includes(router.pathname);

  // If the session is loading, show nothing or a loading state
  if (status === 'loading') {
    return <p>Loading...</p>; // Replace with a loading component if desired
  }

  // If the user is not authenticated and is on a restricted route, do not display Navbar and Footer
  if (!session && isRestrictedRoute) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      {isRestaurantsRoute ? (
        <div>
          <Banner />
          <RestaurantsNavBar />
        </div>
      ) : (
        <NavBar />
      )}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
        async
        defer
      />
      <script
        src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"
        async
        defer
      ></script>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEboTGCNHYI2E8Vy0_2a6y__vqy7Dj2kw&libraries=places&callback=initAutocomplete"
        async
        defer
      ></script>
      <MyAppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

