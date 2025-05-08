import { CompanyLogo } from "@/components/Icons";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useThemeStore } from "@/entities/Theme";
import { Button, Text as TextWrapper } from "@gravity-ui/uikit";

import { createFileRoute } from "@tanstack/react-router";
import { ReactNode, useState } from "react";

const Login = () => {
  const { theme } = useThemeStore();
  const [form, currentForm] = useState<"login" | "register" | "forgot">(
    "login",
  );

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
          <Button
            view="outlined-action"
            onClick={() => currentForm("register")}
          >
            Регистрация
          </Button>
        </div>
        <div className="auth_select">
          <TextWrapper variant={"body-1"} qa="login.forgot.header">
            Забыли пароль?
          </TextWrapper>
          <Button view="outlined-info" onClick={() => currentForm("forgot")}>
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
            Уже зарегистрирован?
          </TextWrapper>
          <Button view="outlined-action" onClick={() => currentForm("login")}>
            Войти
          </Button>
        </div>
      </div>
    );
  };

  const FORM_MAP = {
    login: loginForm,
    register: registerForm,
    forgot: loginForm,
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

export const Route = createFileRoute("/login")({
  component: Login,
});
