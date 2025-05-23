import { CompanyLogo } from "@/components/Icons";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { RequestResetPasswordForm } from "@/components/RequestResetPasswordForm";
import { useThemeStore } from "@/entities/Theme";
import { useUserStore } from "@/entities/User/useUserStore";
import { Alert, Button, Text as TextWrapper } from "@gravity-ui/uikit";

import { createFileRoute } from "@tanstack/react-router";
import { ReactNode, useState } from "react";

const Login = () => {
  const { theme } = useThemeStore();
  const resetRequestSend = useUserStore((state) => state.resetRequestSend);
  const [form, setForm] = useState<"login" | "register" | "forgot">("login");

  const loginForm = (): ReactNode => {
    return (
      <div className="auth_main">
        <div className="auth_header">
          <TextWrapper variant={"header-1"} qa="login.header">
            Вход на портал
          </TextWrapper>
        </div>

        <div className="auth_form">
          <LoginForm />
        </div>

        <div className="auth_select">
          <TextWrapper variant={"body-1"} qa="login.register.header">
            Впервые на портале?
          </TextWrapper>
          <Button view="outlined-action" onClick={() => setForm("register")}>
            Регистрация
          </Button>
        </div>
        <div className="auth_select">
          <TextWrapper variant={"body-1"} qa="login.forgot.header">
            Забыли пароль?
          </TextWrapper>
          <Button view="outlined-info" onClick={() => setForm("forgot")}>
            Восстановить
          </Button>
        </div>
      </div>
    );
  };

  const registerForm = (): ReactNode => {
    return (
      <div className="auth_main">
        <div className="auth_header">
          <TextWrapper variant={"header-1"} qa="register.header">
            Регистрация
          </TextWrapper>
        </div>

        <div className="auth_form">
          <RegisterForm />
        </div>

        <div className="auth_select">
          <TextWrapper variant={"body-1"} qa="register.login.header">
            Уже зарегистрированы?
          </TextWrapper>
          <Button view="outlined-action" onClick={() => setForm("login")}>
            Войти
          </Button>
        </div>
      </div>
    );
  };

  const resetRequestForm = () => {
    return (
      <div className="auth_main">
        <div className="auth_header">
          <TextWrapper variant={"header-1"} qa="register.header">
            Сброс пароля
          </TextWrapper>
        </div>

        <div className="auth_form">
          {resetRequestSend ? (
            <Alert
              theme="warning"
              title="Сброс пароля"
              message="Если пользователь с таким Email существует, то данные для дальнейших шагов буду отправлены на указанный Email"
              align="center"
              style={{
                width: "500px",
              }}
            />
          ) : (
            <RequestResetPasswordForm />
          )}
        </div>

        <div className="auth_select">
          <TextWrapper variant={"body-1"} qa="register.login.header">
            Вспомнили пароль?
          </TextWrapper>
          <Button view="outlined-action" onClick={() => setForm("login")}>
            Войти
          </Button>
        </div>
      </div>
    );
  };

  const FORM_MAP = {
    login: loginForm,
    register: registerForm,
    forgot: resetRequestForm,
  };

  return (
    <div className="auth_page">
      <div className="auth_logo">
        <CompanyLogo
          height={"180px"}
          width={"100%"}
          fill={theme === "dark" ? "white" : "black"}
        />
      </div>

      {FORM_MAP[form]()}
    </div>
  );
};

export const Route = createFileRoute("/login/")({
  component: Login,
});
