// Подключаем необходимые зависимости
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar'; // компонент, отвечающий за поиск

// Описываем тестовый сценарий
test('Поиск достопримечательностей по названию', () => {
  // Рендерим компонент, содержащий поисковую строку
  render(<SearchBar />);

  // Получаем ссылку на поле ввода
  const searchInput = screen.getByRole('textbox', { name: /search/i });

  // Ввод значение в поле поиска
  fireEvent.change(searchInput, { target: { value: 'Усадьба Гальских' } });

  // Проверка, что значение в поле ввода соответствует введенному значению
  expect(searchInput.value).toBe('Усадьба Гальских');

  // Проверка, что компонент или результаты поиска отображаются корректно
  const searchResults = screen.getByRole('list', { name: /search results/i });
  expect(searchResults.children.length).toBeGreaterThan(0);
});
