import { createFileRoute } from "@tanstack/react-router";
import { Container, Text as TextWrapper } from "@gravity-ui/uikit";

import s from "./privacy.module.scss";

export const PrivacyPage = () => {
  return (
    <Container maxWidth="xl" className={s.container}>
      <div className={s.content}>
        <TextWrapper variant="display-2" className={s.title}>
          Политика конфиденциальности
        </TextWrapper>
        <div className={s.updated}>
          <TextWrapper
            variant="body-2"
            color="secondary"
            className={s.lastUpdated}
          >
            Последнее обновление: 21 июня 2025 г.
          </TextWrapper>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            1. Общие положения
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Настоящая Политика конфиденциальности определяет порядок обработки
              и защиты персональных данных пользователей системы управления
              производством Bottle Code (далее — «Система»). Мы серьезно
              относимся к защите ваших персональных данных и обязуемся соблюдать
              принципы их безопасной обработки.
            </TextWrapper>
          </div>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            2. Сбор персональных данных
          </TextWrapper>
          <div className={s.paragraph}>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Мы собираем следующие категории персональных данных:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Регистрационные данные: имя, фамилия, электронная почта
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Профессиональные данные: должность, подразделение, роль в
                системе
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Рабочие данные: информация о выполняемых операциях, созданных
                записях
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Технические данные: IP-адрес, данные браузера, время входа в
                систему
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            3. Цели обработки данных
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Ваши персональные данные обрабатываются в следующих целях:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Обеспечение работы системы управления производством
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Аутентификация и авторизация пользователей
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Ведение учета операций и контроль качества
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Обеспечение безопасности и предотвращение инцидентов
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Создание отчетности и аналитики
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            4. Правовые основания обработки
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Обработка персональных данных осуществляется на основании:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Трудового договора и должностных инструкций
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Согласия на обработку персональных данных
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Требований законодательства о ведении производственной
                отчетности
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            5. Хранение и защита данных
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Мы принимаем все необходимые технические и организационные меры
              для защиты ваших персональных данных от неправомерного доступа,
              изменения, раскрытия или уничтожения:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Шифрование данных при передаче и хранении
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Контроль доступа на основе ролей и полномочий
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Регулярное резервное копирование
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Мониторинг безопасности и аудит доступа
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            6. Сроки хранения данных
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Персональные данные хранятся в течение следующих сроков:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Регистрационные данные — в течение действия трудового договора
                плюс 3 года
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Рабочие данные и записи операций — в соответствии с требованиями
                к производственной отчетности (не менее 5 лет)
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Технические логи — не более 1 года
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            7. Ваши права
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              В отношении ваших персональных данных вы имеете следующие права:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Право на доступ к своим персональным данным
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Право на исправление неточных данных
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Право на ограничение обработки
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Право на возражение против обработки
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Право на получение копии данных в структурированном формате
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            8. Передача данных третьим лицам
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Мы не передаем ваши персональные данные третьим лицам, за
              исключением случаев:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Получения вашего явного согласия
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Требований законодательства или судебных решений
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Передачи обезличенных данных для статистических целей
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            9. Использование файлов cookie
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Система использует файлы cookie для обеспечения функциональности и
              улучшения пользовательского опыта. Cookie используются для:
            </TextWrapper>
          </div>
          <ul className={s.list}>
            <li>
              <TextWrapper variant="body-1">
                Поддержания сессии пользователя
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Сохранения настроек интерфейса
              </TextWrapper>
            </li>
            <li>
              <TextWrapper variant="body-1">
                Анализа использования системы (в обезличенном виде)
              </TextWrapper>
            </li>
          </ul>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            10. Обращения и жалобы
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              По вопросам обработки персональных данных вы можете обратиться к
              администратору системы по электронной почте или через внутреннюю
              систему обращений. Мы рассматриваем все обращения в течение 30
              дней с момента получения.
            </TextWrapper>
          </div>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            11. Изменения в политике
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              Мы оставляем за собой право изменять настоящую Политику
              конфиденциальности. О существенных изменениях мы уведомляем
              пользователей через систему уведомлений не менее чем за 30 дней до
              вступления изменений в силу.
            </TextWrapper>
          </div>
        </div>

        <div className={s.section}>
          <TextWrapper variant="header-1" className={s.sectionTitle}>
            12. Контактная информация
          </TextWrapper>
          <div>
            <TextWrapper variant="body-1" className={s.paragraph}>
              По вопросам обработки персональных данных обращайтесь к
              администратору системы или в службу поддержки через встроенные
              средства системы.
            </TextWrapper>
          </div>
        </div>

        <div className={s.disclaimer}>
          <TextWrapper variant="body-2" color="secondary">
            Данная политика конфиденциальности вступает в силу с момента начала
            использования системы управления производством Bottle Code и
            действует до её отзыва или замены новой версией.
          </TextWrapper>
        </div>
      </div>
    </Container>
  );
};

export const Route = createFileRoute("/_auth/privacy")({
  component: PrivacyPage,
});
