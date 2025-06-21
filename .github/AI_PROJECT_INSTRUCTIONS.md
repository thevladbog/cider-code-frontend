# Инструкции для AI-агентов по работе с проектом BOTTLE [CODE] Frontend

## Обзор проекта

**BOTTLE [CODE] Frontend** - это веб-приложение React для управления бутылочным кодом, построенное на современном стеке технологий.

### Основная информация

- **Название**: bottle-code-frontend
- **Версия**: 0.1.0
- **Тип**: ESM модуль
- **Node.js**: требуется версия >=20
- **Основные технологии**: React 18, TypeScript, Vite, Gravity UI
- **Архитектура**: SPA с серверным рендерингом (SSR) возможностями

## Технологический стек

### Основные зависимости

- **React 18.3.1** - основная библиотека UI
- **TypeScript** - типизированный JavaScript
- **Vite 6.3.2** - сборщик и dev-сервер
- **TanStack Router** - роутинг с типизацией
- **TanStack Query** - управление серверным состоянием
- **Zustand** - глобальное состояние приложения
- **Gravity UI** - компонентная библиотека от Yandex
- **SCSS/Sass** - препроцессор стилей
- **Zod** - валидация схем
- **OpenAPI** - генерация типов API

### Дополнительные инструменты

- **ESLint** - линтер JavaScript/TypeScript
- **Stylelint** - линтер стилей
- **Prettier** - форматтер кода
- **Husky** - Git hooks
- **mkcert** - локальные SSL сертификаты

## Архитектура проекта

### Структура папок

```
src/
├── components/           # Переиспользуемые компоненты UI
│   ├── Footer/          # Подвал приложения
│   ├── Icons/           # Иконки и логотипы
│   ├── LabelDesigner/   # Дизайнер этикеток
│   ├── LabelList/       # Список этикеток
│   ├── LoginForm/       # Форма входа
│   ├── ModalCreateProduct/ # Модаль создания продукта
│   ├── ProductInfo/     # Информация о продукте
│   ├── ProductTable/    # Таблица продуктов
│   ├── RegisterForm/    # Форма регистрации
│   ├── RequestResetPasswordForm/ # Форма сброса пароля
│   ├── ResetPasswordForm/ # Форма изменения пароля
│   ├── ShiftTable/      # Таблица смен
│   └── Wrapper/         # Обертка приложения
├── entities/            # Бизнес-сущности (Domain layer)
│   ├── Label/          # Сущность этикетки
│   ├── Product/        # Сущность продукта
│   ├── Theme/          # Управление темой
│   └── User/           # Сущность пользователя
├── lib/                # Общие утилиты и настройки
│   ├── api.ts          # Конфигурация API клиента
│   ├── zustand.ts      # Настройка state manager
│   ├── const/          # Константы
│   ├── mocks/          # Моки для разработки
│   └── types/          # TypeScript типы
├── routes/             # Маршруты приложения
│   ├── __root.tsx      # Корневой маршрут
│   ├── _auth.tsx       # Защищенные маршруты
│   ├── _auth/          # Вложенные защищенные маршруты
│   └── login/          # Маршруты авторизации
└── styles/             # Глобальные стили
```

### Паттерны архитектуры

#### 1. Feature-Sliced Design (частично)

- **entities/** - бизнес-сущности
- **components/** - переиспользуемые UI компоненты
- **lib/** - общие утилиты

#### 2. File-based routing (TanStack Router)

- Автоматическая генерация маршрутов на основе файловой структуры
- Типизированный роутинг
- Автоматическое code-splitting

#### 3. Component co-location

- Каждый компонент в собственной папке
- SCSS модули рядом с компонентами
- Локальные утилиты в `lib/` подпапках

## Управление состоянием

### Zustand stores

Используется кастомная обертка над Zustand с Immer:

```typescript
// Создание store
export const useUserStore = createStore(initialState, (setState, getState) => {
  // actions
});
```

### Основные stores

- **useUserStore** - состояние пользователя, аутентификация
- **useThemeStore** - управление темой (light/dark)
- **useProductStore** - управление продуктами

### TanStack Query

- Кэширование серверных данных
- Автоматическая инвалидация
- Оптимистичные обновления
- DevTools для отладки

## Роутинг и навигация

### Структура маршрутов

```
/ (root)
├── /login/          # Публичные маршруты
│   └── /reset       # Сброс пароля
└── /_auth           # Защищенные маршруты
    ├── /            # Главная страница
    └── /products    # Управление продуктами
```

### Защита маршрутов

- Приватные маршруты в `_auth` группе
- Проверка аутентификации в layout компонентах
- Автоматические редиректы

## API и типизация

### OpenAPI Integration

- Автогенерация TypeScript типов из OpenAPI схемы
- Типизированный API клиент `openapi-fetch`
- Команда: `npm run types:openapi`

### API клиент

```typescript
// lib/api.ts
export const $api = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include", // cookies для аутентификации
});
```

## Стилизация

### SCSS модули

- CSS Modules с camelCase именованием
- Локальные стили для каждого компонента
- Глобальные переменные в `styles/variables.scss`

### Gravity UI система

- Готовые компоненты UI
- Темизация (light/dark)
- Responsive дизайн

## Команды разработки

### Основные команды

```bash
npm install                 # Установка зависимостей
npm run dev                # Запуск dev сервера
npm run build              # Сборка продакшена
npm run preview            # Предпросмотр сборки
```

### Настройка SSL (локальная разработка)

```bash
# Windows
$env:VITE_FRONTEND_URL='test.in.bottlecode.app'
npm run cert

# Unix/Linux
VITE_FRONTEND_URL='test.in.bottlecode.app' npm run cert
```

### Линтинг и форматирование

```bash
npm run lint               # Полная проверка кода
npm run lint:js:fix        # Исправление JS/TS
npm run lint:styles:fix    # Исправление стилей
npm run lint:prettier:fix  # Форматирование MD
```

### Генерация типов

```bash
npm run types:openapi      # Генерация типов из OpenAPI
```

## Переменные окружения

### Обязательные переменные

```env
VITE_BACKEND_URL=          # URL бэкенда API
VITE_FRONTEND_URL=         # URL фронтенда (для SSL)
```

### Конфигурационные переменные

```env
CONFIG_HOST=               # Хост dev сервера
CONFIG_SSL_CRT_FILE=       # Путь к SSL сертификату
CONFIG_SSL_KEY_FILE=       # Путь к SSL ключу
CONFIG_API_PROXY_URL=      # Прокси для API
```

## Развертывание

### Docker

- **Dockerfile** - многоэтапная сборка
- **docker-compose.yaml** - конфигурация для продакшена
- Поддержка beta и stable веток

### CI/CD

- Автоматическая сборка через GitHub Actions
- Деплой в Yandex Container Registry
- Traefik для load balancing

## Особенности разработки

### 1. Типизация

- Строгая типизация TypeScript
- Генерация типов из OpenAPI схемы
- Типизированный роутинг

### 2. Code splitting

- Автоматическое разделение кода по маршрутам
- Lazy loading компонентов
- Оптимизация bundle размера

### 3. Аутентификация

- Cookie-based аутентификация
- Защищенные маршруты
- Автоматическое перенаправление

### 4. Интернационализация

- Подготовлена структура для i18n
- Русский язык по умолчанию
- Возможность добавления языков

## Руководство по добавлению нового функционала

### 1. Создание нового компонента

```
src/components/NewComponent/
├── index.ts                    # Public API
├── NewComponent.tsx           # Основной компонент
├── NewComponent.module.scss   # Стили
└── lib/                       # Локальные утилиты
    └── helpers.ts
```

### 2. Создание новой сущности

```
src/entities/NewEntity/
├── index.ts                   # Public API
├── useNewEntityStore.ts       # Zustand store
├── types.ts                   # TypeScript типы
└── utils.ts                   # Утилиты сущности
```

### 3. Добавление нового маршрута

```
src/routes/
└── new-route.tsx              # Автоматически подхватится роутером
```

### 4. Добавление API типов

1. Обновить OpenAPI схему в `src/lib/types/openapi/`
2. Запустить `npm run types:openapi`
3. Использовать сгенерированные типы

## Отладка и тестирование

### DevTools

- React DevTools
- TanStack Query DevTools
- TanStack Router DevTools (отключены в продакшене)
- Zustand DevTools (только в dev режиме)

### Тестирование

- Настроена инфраструктура для тестов
- Заглушка: `npm test` возвращает 0
- Рекомендуется настроить Jest/Vitest

## Производительность

### Оптимизации

- Tree shaking
- Code splitting по маршрутам
- CSS Modules для изоляции стилей
- Оптимизация изображений
- Минификация в продакшене

### Мониторинг

- Bundle analyzer доступен через Vite
- Lighthouse аудиты
- Core Web Vitals метрики

## Безопасность

### Основные меры

- HTTPS в продакшене
- Cookie-based аутентификация
- CSP заголовки
- Валидация входных данных через Zod
- Sanitization пользовательского ввода

## Поддержка и обновления

### Обновление зависимостей

```bash
npm outdated               # Проверка устаревших пакетов
npm update                 # Обновление пакетов
```

### Миграции

- Следовать семантическому версионированию
- Тестировать breaking changes
- Документировать изменения в CHANGELOG.md

## Troubleshooting

### Частые проблемы

1. **SSL сертификаты**

   - Убедитесь, что установлен mkcert
   - Проверьте переменные окружения

2. **API подключение**

   - Проверьте VITE_BACKEND_URL
   - Убедитесь, что бэкенд доступен

3. **Проблемы с типами**

   - Запустите `npm run types:openapi`
   - Проверьте OpenAPI схему

4. **Проблемы со стилями**
   - Проверьте импорты SCSS
   - Убедитесь в корректности CSS Modules

## Контакты и ресурсы

### Документация

- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Gravity UI](https://gravity-ui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Vite](https://vitejs.dev/)

### Полезные команды для AI-агентов

```bash
# Быстрый старт разработки
npm install && npm run types:openapi && npm run dev

# Полная проверка кода
npm run lint && npm run build

# Пересборка типов при изменении API
npm run types:openapi

# Очистка и полная переустановка
rm -rf node_modules package-lock.json && npm install
```

---

**Примечание**: Этот документ должен обновляться при значительных изменениях в архитектуре проекта.
