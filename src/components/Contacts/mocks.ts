import { randomInteger } from '../../utils';

const mockPeople = [
  'Абакаров Хизри',
  'Авдеев Михаил',
  'Авксентьева Сардана',
  'Азимов Рахим',
  'Аиткулова Эльвира',
  'Аксаков Анатолий',
  'Аксёненко Александр',
  'Алексеенко Николай',
  'Алехин Андрей',
  'Алимова Ольга',
  'Алтухов Сергей',
  'Альшевских Андрей',
  'Амельченкова Ольга',
  'Аммосов Петр',
  'Ананских Игорь',
  'Аникеев Андрей',
  'Аникеев Григорий',
  'Антропенко Игорь',
  'Ануфриева Ольга',
  'Арапов Георгий',
  'Арефьев Николай',
  'Артамонова Валентина',
  'Аршинова Алёна',
  'Афонин Юрий',
  'Бабаков Александр',
  'Бабашов Леонид',
  'Бабич Иван',
  'Баженов Тимофей',
  'Баталова Рима',
  'Бахарев Константин',
  'Бахметьев Виталий',
  'Овчинников Лев',
  'Белик Дмитрий',
  'Белоусов Вадим',
  'Белых Ирина',
  'Берулава Михаил',
  'Бессараб Светлана',
  'Бессарабов Даниил',
  'Бессонов Евгений',
  'Бидонько Сергей',
  'Бифов Анатолий',
  'Бичаев Артем',
  'Блоцкий Владимир',
  'Бондаренко Елена',
  'Борисов Александр',
  'Бородай Александр',
  'Борцов Николай',
  'Боярский Сергей',
  'Брыкин Николай',
  'Будуев Николай',
  'Булавинов Вадим',
  'Буранова Лариса',
  'Бурлаков Сергей',
  'Бурляев Николай',
  'Бурматов Владимир',
  'Бутина Мария',
  'Буцкая Татьяна',
  'Валеев Эрнест',
  'Валенчук Олег',
  'Васильев Владимир',
  'Васильев Николай',
  'Василькова Мария',
  'Вассерман Анатолий',
  'Веллер Алексей',
  'Веремеенко Сергей',
  'Власов Василий',
  'Власова Вероника',
  'Водолацкий Виктор',
  'Водянов Роман',
  'Волоцков Алексей',
  'Вольфсон Илья',
  'Вороновский Анатолий',
  'Вторыгина Елена',
  'Выборный Анатолий',
  'Вяткин Дмитрий',
  'Гаврилов Сергей',
  'Гарин Олег',
  'Гартунг Валерий',
  'Германова Ольга',
  'Гетта Антон',
  'Гимбатов Андрей',
  'Гладких Борис',
  'Глазкова Анжелика',
  'Говырин Алексей',
  'Голиков Олег',
  'Гончаров Николай',
  'Горохов Андрей',
  'Горячева Ксения',
  'Грешневиков Анатолий',
  'Григорьев Юрий',
  'Григоренко Сергей',
  'Гулин Максим',
  'Гурулёв Андрей',
  'Гусев Дмитрий',
  'Даванков Владислав',
  'Данчикова Галина',
  'Демин Александр',
  'Демченко Иван',
  'Дерябкин Виктор',
  'Дзюба Виктор',
  'Диденко Алексей',
  'Димов Олег',
  'Долуда Николай',
  'Дорошенко Андрей',
  'Драпеко Елена',
  'Дрожжина Юлия',
  'Дроздов Александр',
  'Дьяконова Татьяна',
  'Евтюхова Елена',
  'Езерский Николай',
  'Езубов Алексей',
  'Ефимов Виталий',
  'Жуков Александр',
  'Журавлев Алексей',
  'Журова Светлана',
  'Завальный Павел',
  'Заварзин Виктор',
  'Затулин Константин',
  'Захаров Константин',
  'Зубарев Виктор',
  'Иванинский Олег',
  'Иванов Владимир',
  'Иванов Максим',
  'Иванюженков Борис',
  'Ивенских Ирина',
  'Ивлев Леонид',
  'Игнатов Виктор',
  'Игошин Игорь',
  'Ильиных Владимир',
  'Ильтяков Александр',
  'Исаев Андрей',
  'Исаков Владимир',
  'Исламов Дмитрий'
];

const character = ['crazy', 'furious', 'sad', 'happy', 'lucky', 'snoopy'];
const animals = ['dog', 'squirrel', 'raccoon', 'snake', 'cat'];
const mails = ['gmail.com', 'yandex.ru'];

export const contacts = mockPeople.map((p, i) => ({
  id: i,
  name: p,

  phone: '8'
  + ['953', '921', '988'][randomInteger(0, 2)]
  + randomInteger(1e6, 1e7 - 1),

  email: character[randomInteger(0, character.length - 1)]
  + animals[randomInteger(0, animals.length - 1)]
  + '@'
  + mails[randomInteger(0, mails.length - 1)]
}));
