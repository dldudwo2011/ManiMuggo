import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DriverApplications from '../components/DriverApplications';
import RestaurantApplications from '../components/RestaurantApplications';
import CurrentOrders from '../components/CurrentOrders';

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
  
  useEffect(() => {
    // Redirect if not logged in or if the email is not the admin email
    if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push('/unauthorized');
    }
  }, [session, router]);

  if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return null; // Optionally render a loading spinner here
  }

  const [selectedSection, setSelectedSection] = useState(null);

  const renderSection = () => {
    switch (selectedSection) {
      case 'drivers':
        return <DriverApplications />;
      case 'restaurants':
        return <RestaurantApplications />;
      case 'orders':
        return <CurrentOrders />;
      default:
        return (
          <div className="text-center text-gray-600 mt-10">
            <p>Select a section from the sidebar to view its contents.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Manimuggo Admin</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedSection('drivers')}
                className={`w-full text-left p-2 rounded ${
                  selectedSection === 'drivers' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                Driver Applications
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('restaurants')}
                className={`w-full text-left p-2 rounded ${
                  selectedSection === 'restaurants' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                Restaurant Applications
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('orders')}
                className={`w-full text-left p-2 rounded ${
                  selectedSection === 'orders' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                Current Orders
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        {renderSection()}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AdminPage;


