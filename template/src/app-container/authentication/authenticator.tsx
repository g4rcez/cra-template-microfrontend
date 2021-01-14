import { useEffect, useState, FC } from "react";
import { Endpoints, useHttpClient } from "../../lib/http-client";
import { User, UserContext } from "../logged-user-context";

const Authenticator: FC = ({ children }) => {
  const [userData, setUserData] = useState<User>({} as User);
  const httpClient = useHttpClient();

  useEffect(() => {
    const req = async () => {
      try {
        const response = await httpClient.get(Endpoints.userInfo);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    req();
  }, [httpClient]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default Authenticator;
