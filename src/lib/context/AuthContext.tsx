import { useRouter } from "next/router";
import React, { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { isValidToken, setRefreshToken, setToken } from "../utils/jwt";
import { getMe } from "../api";

type AuthType = {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
};

const initialState: AuthType = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
  handleLogout: () => Promise<void>;
  handleLogin: (payload: AuthType) => Promise<void>;
};

type Action =
  | {
      type: "INITIALIZE";
      payload: {
        accessToken: string | null;
        refreshToken: string | null;
        user: any;
      };
    }
  | {
      type: "LOGIN";
      payload: {
        accessToken: string | null;
        refreshToken: string | null;
        user: any;
      };
    }
  | { type: "LOGOUT" };

const reducer = (state: AuthType, action: Action): AuthType => {
  switch (action.type) {
    case "INITIALIZE": {
      const {
        accessToken,
        // user,
        refreshToken,
      } = action.payload;
      return {
        ...state,
        accessToken,
        refreshToken,
        // user,
      };
    }

    case "LOGIN": {
      const {
        accessToken,
        // user,
        refreshToken,
      } = action.payload;
      return {
        ...state,
        accessToken,
        refreshToken,
        // user,
      };
    }

    case "LOGOUT": {
      return { ...state, ...initialState };
    }
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (accessToken && isValidToken(refreshToken)) {
        const user = await getMe();
        dispatch({
          type: "INITIALIZE",
          payload: {
            accessToken: accessToken,
            refreshToken: refreshToken as string,
            user: user.data,
          },
        });
      } else {
        handleLogout();
      }
    } catch (err) {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    setToken("");
    setRefreshToken("");
    dispatch({ type: "LOGOUT" });
  };

  const handleLogin = async (payload: AuthType) => {
    setToken(payload.accessToken);
    setRefreshToken(payload.refreshToken);
    dispatch({
      type: "LOGIN",
      payload: payload,
    });
    toast("Đăng nhập thành công", { type: "success" });
    router.push("/");
  };

  const authContextValue = {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    user: state.user,
    handleLogout,
    handleLogin,
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
