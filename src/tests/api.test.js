// Импортируем библиотеку для отправки HTTP-запросов
import axios from 'axios';

// Опишем тестовый сценарий
test('Проверка соединения с API', async () => {
  try {
    // Отправляем GET-запрос к вашему API
    const response = await axios.get('http://localhost/sight_api/');

    // Проверяем статусный код ответа
    expect(response.status).toBe(200);

    // Проверяем, что полученные данные не являются пустыми
    expect(response.data).toBeTruthy();

    // Дополнительные проверки по необходимости...
  } catch (error) {
    // Если произошла ошибка, считаем тест не пройденным
    throw new Error('Не удалось соединиться с API');
  }
});
