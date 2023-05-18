import { render, screen } from '@testing-library/react';
import SightPage from '../SightPage';

describe('SightPage', () => {
  const mockSight = {
    name: 'Название достопримечательности',
    description: 'Описание достопримечательности',
    photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
    location: 'Местоположение достопримечательности',
  };

  beforeEach(() => {
    render(<SightPage sight={mockSight} />);
  });

  it('отображает название достопримечательности', () => {
    const nameElement = screen.getByText(mockSight.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('отображает описание достопримечательности', () => {
    const descriptionElement = screen.getByText(mockSight.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('отображает фотографии достопримечательности', () => {
    const photoElements = screen.getAllByRole('img');
    expect(photoElements).toHaveLength(mockSight.photos.length);

    mockSight.photos.forEach((photo, index) => {
      expect(photoElements[index]).toHaveAttribute('src', photo);
    });
  });

  it('отображает местоположение достопримечательности', () => {
    const locationElement = screen.getByText(mockSight.location);
    expect(locationElement).toBeInTheDocument();
  });
});
