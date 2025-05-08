import { useForm } from "@tanstack/react-form";
import { Button, Text as TextWrapper, useToaster } from "@gravity-ui/uikit";

import s from "./RegisterForm.module.scss";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { sleep } from "@/entities/User/utils";
import { useUserStore } from "@/entities/User/useUserStore";
import { getRegisterSchema, registerFields } from "./lib/getScheme";

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
        {registerFields.map((field) => {
          return (
            <form.Field
              key={field.name}
              name={field.name}
              children={(currentField) => {
                return (
                  <div className={s.fieldWrapper}>
                    <label htmlFor={currentField.name}>
                      <TextWrapper
                        variant="body-1"
                        qa={`register.${currentField.name}.label`}
                      >
                        {field.label}
                      </TextWrapper>
                    </label>
                    <field.Component
                      size={"l"}
                      id={currentField.name}
                      name={currentField.name}
                      value={currentField.state.value}
                      onChange={(e) =>
                        currentField.handleChange(e.target.value)
                      }
                      onBlur={currentField.handleBlur}
                      className={s.field}
                      hasClear={true}
                      placeholder={field.placeholder}
                      qa={`register.${currentField.name}.field`}
                      errorMessage={currentField.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        currentField.state.meta.isTouched &&
                        currentField.state.meta.errors.length
                          ? "invalid"
                          : undefined
                      }
                    />
                  </div>
                );
              }}
            />
          );
        })}

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
