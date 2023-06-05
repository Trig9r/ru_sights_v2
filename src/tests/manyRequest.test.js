import axios from 'axios';

describe('Производительность и нагрузочное тестирование', () => {
  it('обрабатывает большое количество запросов без сбоев или задержек', async () => {
    const requestCount = 100; // Количество запросов для отправки

    // Массив промисов для хранения результатов запросов
    const requestPromises = [];

    // Отправка множества параллельных запросов
    for (let i = 0; i < requestCount; i++) {
      requestPromises.push(
        axios.get('https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/'),
      );
    }

    // Ожидание выполнения всех запросов
    const responses = await Promise.all(requestPromises);

    // Проверка успешного выполнения всех запросов
    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });
  });
});
