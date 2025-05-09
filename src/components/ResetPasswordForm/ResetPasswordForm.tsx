import { useForm } from "@tanstack/react-form";
import { Button, Text as TextWrapper, useToaster } from "@gravity-ui/uikit";

import s from "./ResetPasswordForm.module.scss";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { sleep } from "@/entities/User/utils";
import { useUserStore } from "@/entities/User/useUserStore";
import {
  getResetPasswordFormSchema,
  resetPasswordFormFields,
} from "./lib/getScheme";

export const ResetPasswordForm = () => {
  const scheme = getResetPasswordFormSchema();
  const router = useRouter();
  const navigate = useNavigate();

  const { token, id: userId }: { token: string; id: string } = useSearch({
    from: "/login/reset",
  });

  const { add } = useToaster();

  const resetPassword = useUserStore((state) => state.resetPassword);

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: scheme,
    },
    onSubmit: async ({ value }) => {
      try {
        const body = {
          password: value.password,
          token,
          userId,
        };
        await resetPassword(body);
        await router.invalidate();

        await sleep(1);

        await navigate({ to: "/login" });
      } catch (error) {
        add({
          name: "ResetPasswordForm",
          title: "Что-то пошло не так ...",
          content: `При сбросе пароля произошла ошибка: ${JSON.stringify(error)}`,
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
        {resetPasswordFormFields.map((field) => {
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
                        qa={`reset.${currentField.name}.label`}
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
                      qa={`reset.${currentField.name}.field`}
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
                qa={`reset.button.reset`}
              >
                Сбросить данные формы
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                view={"action"}
                loading={isSubmitting}
                size="l"
                qa={`reset.button.submit`}
              >
                Сохранить новый пароль
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
