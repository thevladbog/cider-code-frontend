import { $api } from "@/lib/api";
import {
  CreateUserDto,
  CreatedUserDto,
  ResetPasswordDto,
} from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { showErrorToast } from "@/lib/toaster";

interface IUserState {
  data: CreatedUserDto | null;
  isLoading: boolean;
  isLogoutLoading: boolean;
  resetRequestSend: boolean;
}

const initialState: IUserState = {
  data: null,
  isLoading: false,
  isLogoutLoading: false,
  resetRequestSend: false,
};

export const useUserStore = createStore(initialState, (setState, getState) => {
  const login = async (email: string, password: string) => {
    setState({ isLoading: true });

    // eslint-disable-next-line new-cap
    const { data, error } = await $api.POST("/user/auth/sign-in", {
      body: {
        email,
        password,
      },
    });

    if (error) {
      showErrorToast(
        "При входе в систему произошла ошибка. Пожалуйста, проверьте свои учетные данные и попробуйте еще раз.",
        new Error("Login error: " + JSON.stringify(error)),
      );
      setState({ isLoading: false, resetRequestSend: false });
      throw new Error("Something went wrong: " + error);
    }

    setState({
      data: data?.user as CreatedUserDto,
      isLoading: false,
      resetRequestSend: false,
    });
    return data;
  };
  const register = async (props: CreateUserDto) => {
    // eslint-disable-next-line new-cap
    const { data, error } = await $api.POST("/user", {
      body: props,
    });

    if (error) {
      showErrorToast(
        "При регистрации произошла ошибка. Пожалуйста, попробуйте еще раз.",
        new Error("Registration error: " + JSON.stringify(error)),
      );
      throw new Error("Something went wrong: " + error);
    }

    setState({ data: data?.result as CreatedUserDto });
    return data;
  };

  const logout = async () => {
    setState({ isLogoutLoading: true });

    // eslint-disable-next-line new-cap
    const { error } = await $api.POST("/user/auth/revoke-token");

    if (error) {
      showErrorToast(
        "При выходе из системы произошла ошибка. Пожалуйста, попробуйте еще раз.",
        new Error("Logout error: " + JSON.stringify(error)),
      );
      setState({ isLogoutLoading: false });
      throw new Error("Something went wrong: " + error);
    }

    setState(initialState);
    document.location.assign("/");
  };

  const getDataAboutMe = async () => {
    setState({ isLoading: true });

    // eslint-disable-next-line new-cap
    const { data, error } = await $api.GET("/user/auth/me");

    if (error) {
      setState({ isLoading: false, data: null });
      throw new Error("Something went wrong: " + error);
    }

    setState({ data: data?.result as CreatedUserDto, isLoading: false });
    return data;
  };

  const sendResetRequest = async (email: string) => {
    // eslint-disable-next-line new-cap
    const { error } = await $api.POST("/user/auth/reset-password-request", {
      body: { email },
    });

    if (error) {
      showErrorToast(
        "При запросе сброса пароля произошла ошибка",
        new Error("Reset password request error: " + JSON.stringify(error)),
      );
      throw new Error("Something went wrong: " + error);
    }

    setState({ resetRequestSend: true });
  };

  const resetPassword = async (body: ResetPasswordDto) => {
    // eslint-disable-next-line new-cap
    const { error } = await $api.POST("/user/auth/reset-password", {
      body,
    });

    if (error) {
      showErrorToast(
        "При сбросе пароля произошла ошибка",
        new Error("Reset password error: " + JSON.stringify(error)),
      );
      throw new Error("Something went wrong: " + error);
    }

    setState({ resetRequestSend: false });
    return true;
  };

  const isAuth = () => {
    const state = getState();
    return Boolean(state.data);
  };

  return {
    login,
    logout,
    getDataAboutMe,
    isAuth,
    register,
    sendResetRequest,
    resetPassword,
  };
});

export const {
  login,
  logout,
  getDataAboutMe,
  isAuth,
  register,
  sendResetRequest,
  resetPassword,
} = useUserStore.getState();

export const user = {
  login,
  logout,
  getDataAboutMe,
  isAuth,
  register,
  sendResetRequest,
  resetPassword,
};
