import axios from 'axios';

describe('Редактирование достопримечательности', () => {
  let sightId; // Идентификатор достопримечательности, которая будет отредактирована

  beforeAll(async () => {
    // Получение идентификатора существующей достопримечательности для редактирования
    const existingSight = await axios.get('http://srv191964.hoster-test.ru/sight_api/sights');
    sightId = existingSight.data[0].id;
  });

  it('можно отредактировать и сохранить изменения', async () => {
    // Загрузка текущей информации о достопримечательности
    const currentSight = await axios.get(
      `http://srv191964.hoster-test.ru/sight_api/sights/${sightId}`,
    );

    // Внесение изменений в данные достопримечательности
    const updatedSightData = {
      ...currentSight.data,
      name: 'Новое название достопримечательности',
      description: 'Новое описание достопримечательности',
    };

    // Отправка запроса на обновление данных достопримечательности
    const response = await axios.put(
      `http://srv191964.hoster-test.ru/sight_api/sights/${sightId}`,
      updatedSightData,
    );

    // Проверка успешного статус ответа
    expect(response.status).toBe(200);

    // Загрузка обновленной информации о достопримечательности
    const updatedSight = await axios.get(
      `http://srv191964.hoster-test.ru/sight_api/sights/${sightId}`,
    );

    // Проверка, что данные достопримечательности были успешно изменены
    expect(updatedSight.data.name).toBe(updatedSightData.name);
    expect(updatedSight.data.description).toBe(updatedSightData.description);
  });
});
