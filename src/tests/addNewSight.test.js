import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import AddSightForm from './AddSightForm';

jest.mock('axios');

describe('Добавление новой достопримечательности', () => {
  it('сохраняет новую достопримечательность в базе данных', async () => {
    // Мокируем успешный ответ от сервера
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<AddSightForm />);

    // Заполнение обязательных полей формы
    const nameInput = screen.getByLabelText('Название');
    const descriptionInput = screen.getByLabelText('Описание');
    const addressInput = screen.getByLabelText('Адрес');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Новая достопримечательность' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'Описание новой достопримечательности' },
      });
      fireEvent.change(addressInput, { target: { value: 'Москва, Россия' } });
    });

    // Отправление формы
    const submitButton = screen.getByRole('button', { name: 'Добавить' });

    act(() => {
      fireEvent.click(submitButton);
    });

    // Проверка, что запрос к серверу был выполнен с правильными данными
    expect(axios.post).toHaveBeenCalledWith('http://localhost/sight_api/', {
      name: 'Новая достопримечательность',
      description: 'Описание новой достопримечательности',
      address: 'Москва, Россия',
    });

    // Проверка, что сообщение об успешном сохранении отображается
    const successMessage = await screen.findByText('Достопримечательность успешно добавлена');
    expect(successMessage).toBeInTheDocument();
  });
});
