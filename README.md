## [Демо](https://contacts-app-takeoff-staff.herokuapp.com)

## Установка приложения
* Склонировать репозиторий
* Запуск команды `npm install`
* Запуск приложения `npm run start`

Разработка велась с использованием node v16.15.0.

## Тестовые пользователи
Пользователь 1: 
  * **login**: john
  * **password**: secret1

Пользователь 2:
  * **login**: serg
  * **password**: secret2

## Предпосылки
* Поскольку предполагается создание корпоративных приложений, я не использовал дополнительные библиотеки вроде MATERIAL-UI или Ant Design, поскольку, по моему опыту, там обычно требуется либо использовать корпоративную библиотеку, либо делать компоненты с нуля, для уменьшения к-ва зависимостей (о чем я потом горько пожалел, поскольку я сам не представлял, что должно получиться и много раз переделывал).
* Для api приложения развернут реальный сервер на Heroku. Код [здесь](https://github.com/GrigorenkoSergey/takeoff-staff-back). 

