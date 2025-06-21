import { $api } from "@/lib/api";
import {
  CreateUserDto,
  CreatedUserDto,
  ResetPasswordDto,
} from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { Toaster } from "@gravity-ui/uikit";

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

const toaster = new Toaster();

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
      toaster.add({
        name: "login",
        title: "Что-то пошло не так ...",
        content: `При входе в систему произошла ошибка. Пожалуйста, проверьте свои учетные данные и попробуйте еще раз.`,
        isClosable: true,
        theme: "danger",
      });
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
      toaster.add({
        name: "register",
        title: "Что-то пошло не так ...",
        content: `При регистрации произошла ошибка. Пожалуйста, попробуйте еще раз.`,
        isClosable: true,
        theme: "danger",
      });
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
      toaster.add({
        name: "logout",
        title: "Что-то пошло не так ...",
        content: `При выходе из системы произошла ошибка. Пожалуйста, попробуйте еще раз.`,
        isClosable: true,
        theme: "danger",
      });
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
      toaster.add({
        name: "getDataAboutMe",
        title: "Что-то пошло не так ...",
        content: `При получении данных произошла ошибка. Вы будете разлогинены!`,
        isClosable: true,
        theme: "danger",
      });
      setState({ isLoading: false });
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
      toaster.add({
        name: "sendResetRequest",
        title: "Что-то пошло не так ...",
        content: `При запросе сброса пароля произошла ошибка`,
        isClosable: true,
        theme: "danger",
      });
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
      toaster.add({
        name: "resetPassword",
        title: "Что-то пошло не так ...",
        content: `При сбросе пароля произошла ошибка`,
        isClosable: true,
        theme: "danger",
      });
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
