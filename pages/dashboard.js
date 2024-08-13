import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import OrderHistory from '../components/userDashboard/OrderHistory';
import RealTimeOrderTracking from '../components/userDashboard/RealTimeOrderTracking';
import ProfileManagement from '../components/userDashboard/ProfileManagement';
import LoyaltyAndRewards from '../components/userDashboard/LoyaltyAndRewards';
import Favorites from '../components/userDashboard/Favorites';
import NotificationsAndAlerts from '../components/userDashboard/NotificationsAndAlerts';
import Settings from '../components/userDashboard/Settings';
import SupportAndFeedback from '../components/userDashboard/SupportAndFeedback';
import SubscriptionServices from '../components/userDashboard/SubscriptionServices';
import AccountOverview from '../components/userDashboard/AccountOverview';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [activeComponent, setActiveComponent] = useState('accountOverview');

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Redirect to login page if not authenticated
    }
  }, [status]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orderHistory':
        return <OrderHistory userId={session.user.id} />;
      case 'realTimeOrderTracking':
        return <RealTimeOrderTracking userId={session.user.id} />;
      case 'profileManagement':
        return <ProfileManagement userId={session.user.id} />;
      case 'loyaltyAndRewards':
        return <LoyaltyAndRewards userId={session.user.id} />;
      case 'favorites':
        return <Favorites userId={session.user.id} />;
      case 'notificationsAndAlerts':
        return <NotificationsAndAlerts userId={session.user.id} />;
      case 'settings':
        return <Settings userId={session.user.id} />;
      case 'supportAndFeedback':
        return <SupportAndFeedback userId={session.user.id} />;
      case 'subscriptionServices':
        return <SubscriptionServices userId={session.user.id} />;
      case 'accountOverview':
      default:
        return <AccountOverview userId={session.user.id} />;
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading state while checking session
  }

  if (session) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-green-600">Dashboard</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveComponent('accountOverview')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'accountOverview' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Account Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('orderHistory')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'orderHistory' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Order History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('realTimeOrderTracking')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'realTimeOrderTracking' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Real-Time Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('profileManagement')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'profileManagement' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Profile Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('loyaltyAndRewards')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'loyaltyAndRewards' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Loyalty and Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('favorites')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'favorites' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Favorites
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('notificationsAndAlerts')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'notificationsAndAlerts' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Notifications and Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('settings')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'settings' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('supportAndFeedback')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'supportAndFeedback' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Support and Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('subscriptionServices')}
                  className={`w-full text-left p-2 rounded ${
                    activeComponent === 'subscriptionServices' ? 'bg-green-200 text-green-900' : 'hover:bg-green-100'
                  }`}
                >
                  Subscription Services
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Welcome, {session.user.name}!</h1>
          <div className="bg-white shadow rounded-lg p-6">
            {renderComponent()}
          </div>
        </main>
      </div>
    );
  }

  return null; // Return null or a placeholder until session is determined
};

export default Dashboard;


