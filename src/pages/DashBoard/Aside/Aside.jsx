import React, { useContext, useState } from 'react';
import { FaTachometerAlt, FaUserCircle, FaBoxes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate} from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../../../Firebase/firebase.config';

// Define the menu structure outside the component
const sidebarStructure = [
  // Main Navigation Items
  { id: 1, name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard/main', type: 'main' },
  { id: 2, name: 'Manage Products', icon: <FaUserCircle />, path: '/dashboard/manage-products', type: 'main' },
  { id: 3, name: 'All Users', icon: <FaUserCircle />, path: '/dashboard/all-users', type: 'main' },
  { id: 4, name: 'Add Request', icon: <FaBoxes />, path: '/dashboard/add-request', type: 'main', role: 'donor' },
  { id: 5, name: 'My Request', icon: <FaBoxes />, path: '/dashboard/my-request', type: 'main', role: 'donor' },
  
  // Bottom Item (Logout)
  { id: 6, name: 'Logout', icon: <FaSignOutAlt />, path: '/logout', type: 'bottom' },
];




const Aside = () => {
  const [activePath, setActivePath] = useState('/dashboard');
  const navigate = useNavigate();
  const {role} = useContext(AuthContext)

 // console.log(role)

  const handlelogout = () => {
    signOut(auth)
  }

  const handleItemClick = (path) => {
    setActivePath(path);
    console.log(`Navigating to: ${path}`);
    navigate(`${path}`)
  };

  // Function to determine classes based on path, without conditional JSX
  const getLinkClasses = (path, type) => {
    const isActive = activePath === path;
    
    // Base classes applied to all links
    let classes = `flex items-center p-3 text-sm font-medium rounded-lg transition-colors duration-200`;

    // Active/Inactive/Type-Specific Classes
    if (type === 'main') {
      classes += isActive
        ? ' bg-blue-600 text-white shadow-md'
        : ' text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700';
    } else if (type === 'bottom') {
      // Logout link style
      classes += ' text-red-500 hover:bg-red-50 dark:hover:bg-gray-700';
    }

    return classes;
  };

  // --- Single Return Statement Starts Here ---
  return (
    <aside className="
      w-64 h-screen 
      fixed top-0 left-0 z-40 
      bg-white dark:bg-gray-800 
      shadow-xl 
      flex flex-col justify-between 
      py-4
    ">
      
      {/* Top Section: Logo and Main Menu */}
      <div>
        {/* Logo/Title */}
        <div className="px-6 pb-6 border-b dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600">
            Admin Panel
          </span>
        </div>

        {/* Main Navigation Links */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {sidebarStructure
              .filter(item => item.type === 'main') // Filter for main items
              .filter(item => !item.role || item.role === role) 
              .map(item => (
                <li key={item.id}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleItemClick(item.path); }}
                    className={getLinkClasses(item.path, item.type)}
                  >
                    <div className="w-5 h-5 mr-3">{item.icon}</div>
                    <span>{item.name}</span>
                  </a>
                </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Logout */}
      <div className="border-t dark:border-gray-700 p-4">
        <ul className="space-y-2">
            {sidebarStructure
                .filter(item => item.type === 'bottom') // Filter for bottom item (Logout)
                .map(item => (
                    <li key={item.id}>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlelogout(); }}
                            className={getLinkClasses(item.path, item.type)}
                        >
                            <div className="w-5 h-5 mr-3">{item.icon}</div>
                            <span>{item.name}</span>
                        </a>
                    </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;