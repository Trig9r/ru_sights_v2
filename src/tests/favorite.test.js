import axios from 'axios';

describe('Добавление в избранное', () => {
  let sightId; // Идентификатор достопримечательности, которую будет добавлена в избранное

  beforeAll(async () => {
    // Получение идентификатор существующей достопримечательности для добавления в избранное
    const existingSight = await axios.get('http://localhost/sight_api/sights');
    sightId = existingSight.data[0].id;
  });

  it('достопримечательность может быть добавлена в избранное', async () => {
    // Отправка запроса на добавление достопримечательности в избранное
    const response = await axios.post(`http://localhost/sight_api/sights/${sightId}/favorite`);

    // Проверка успешного статус ответа
    expect(response.status).toBe(200);

    // Проверка, что достопримечательность была добавлена в избранное
    const sight = await axios.get(`http://localhost/sight_api/sights/${sightId}`);
    expect(sight.data.isFavorite).toBe(true);
  });

  it('достопримечательность может быть удалена из избранного', async () => {
    // Отправка запроса на удаление достопримечательности из избранного
    const response = await axios.delete(`http://localhost/sight_api/sights/${sightId}/favorite`);

    // Проверка успешного статус ответа
    expect(response.status).toBe(200);

    // Проверка, что достопримечательность была удалена из избранного
    const sight = await axios.get(`http://localhost/sight_api/sights/${sightId}`);
    expect(sight.data.isFavorite).toBe(false);
  });
});
