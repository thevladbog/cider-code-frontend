import { useForm } from "@tanstack/react-form";
import {
  Button,
  PasswordInput,
  TextInput,
  Text as TextWrapper,
  useToaster,
} from "@gravity-ui/uikit";

import s from "./RegisterForm.module.scss";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { sleep } from "@/entities/User/utils";
import { useUserStore } from "@/entities/User/useUserStore";
import { getRegisterSchema } from "./lib/getScheme";

export const RegisterForm = () => {
  const scheme = getRegisterSchema();
  const router = useRouter();
  const navigate = useNavigate();

  const { add } = useToaster();

  const register = useUserStore((state) => state.register);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: scheme,
    },
    onSubmit: async ({ value }) => {
      try {
        const body = {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
        };
        await register(body);
        await router.invalidate();

        await sleep(1);

        await navigate({ to: "/" });
      } catch (error) {
        add({
          name: "register",
          title: "Что-то пошло не так ...",
          content: `При регистрации произошла ошибка: ${JSON.stringify(error)}`,
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
          name="firstName"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`register.${field.name}.label`}
                  >
                    Имя:
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
                  placeholder="Введите имя"
                  qa={`register.${field.name}.field`}
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
          name="lastName"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`register.${field.name}.label`}
                  >
                    Фамилия:
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
                  placeholder="Введите фамилию"
                  qa={`register.${field.name}.field`}
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
          name="email"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`register.${field.name}.label`}
                  >
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
                  qa={`register.${field.name}.field`}
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
                  <TextWrapper
                    variant="body-1"
                    qa={`register.${field.name}.label`}
                  >
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
                  placeholder="Введите пароль"
                  qa={`register.${field.name}.field`}
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
          name="confirmPassword"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`register.${field.name}.label`}
                  >
                    Подтвердите пароль:
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
                  placeholder="Введите пароль"
                  qa={`register.${field.name}.field`}
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
                qa={`register.button.reset`}
              >
                Сбросить данные формы
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                view={"action"}
                loading={isSubmitting}
                size="l"
                qa={`register.button.submit`}
              >
                Зарегистрироваться
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
