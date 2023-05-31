import { createContext, useState, useEffect } from 'react';

function getUserCookie() {
    const cookieName = "user_id=";
    const cookieArray = document.cookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie[0] === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  
    return "";
}

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setAuthorizing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setAuthorizing(true);
        const userId = getUserCookie();
        const response = await fetch(`${process.env.REACT_APP_API}/authorization`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${userId}`
          }
        });
        const userData = await response.json();
        
        if (userData.success) setUser(userData.user);
        setAuthorizing(false);
      } catch (error) {
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthorizing }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };