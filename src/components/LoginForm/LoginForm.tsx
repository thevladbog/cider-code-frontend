import { useForm } from "@tanstack/react-form";
import {
  Button,
  PasswordInput,
  TextInput,
  Text as TextWrapper,
  useToaster,
} from "@gravity-ui/uikit";
import { getLoginSchema } from "./lib/getScheme";

import s from "./LoginForm.module.scss";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { sleep } from "@/entities/User/utils";
import { useUserStore } from "@/entities/User/useUserStore";

export const LoginForm = () => {
  const scheme = getLoginSchema();
  const router = useRouter();
  const navigate = useNavigate();

  const { add } = useToaster();

  const login = useUserStore((state) => state.login);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: scheme,
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password);
        await router.invalidate();

        await sleep(1);

        await navigate({ to: "/" });
      } catch (error) {
        add({
          name: "login",
          title: "Что-то пошло не так ...",
          content: `При входе в систему произошла ошибка: ${JSON.stringify(error)}`,
          isClosable: true,
        });
      }
    },
  });

  return (
    <div className={s.body}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().then();
        }}
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper variant="body-1" qa={`auth.${field.name}.label`}>
                    Email:
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите email"
                  qa={`auth.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper variant="body-1" qa={`auth.${field.name}.label`}>
                    Пароль:
                  </TextWrapper>
                </label>
                <PasswordInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите email"
                  qa={`auth.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className={s.buttons}>
              <Button
                type="reset"
                onClick={() => form.reset()}
                size="l"
                view="outlined"
                qa={`auth.button.reset`}
              >
                Сбросить данные формы
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                view={"action"}
                loading={isSubmitting}
                size="l"
                qa={`auth.button.submit`}
              >
                Войти
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
