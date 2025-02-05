import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { CardDetails } from '../components/cards/cardDetails/CardDetails';
import { mockCharacters } from './mock/mockedData';

// vi.mock('../../service/futuramaAPI', () => ({
//   FuturamaApi: {
//     getCharacter: vi.fn(() => Promise.resolve(mockCharacters[0])),
//     loading: true,
//   },
// }));

const mockResponse = {
  ok: true,
  statusText: 'OK',
  json: async () => mockCharacters[0],
} as Response;
globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

describe('tests for the Detailed Card component', () => {
  const onCardClose = vi.fn();

  const renderCardDetails = () => {
    return render(
      <Router>
        <CardDetails
          itemId={String(mockCharacters[0].id)}
          onCardClose={onCardClose}
        />
      </Router>
    );
  };

  it('check that a loading indicator is displayed while fetching data', async () => {
    renderCardDetails();
    await act(async () => {
      await expect(screen.queryByTestId('spinner')).not.toBeNull();
    });
  });

  it('check that the detailed card data is displayed when loading is false', async () => {
    await act(async () => {
      await renderCardDetails();
    });

    expect(await screen.findByText(mockCharacters[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(`Gender - ${mockCharacters[0].gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Status - ${mockCharacters[0].status}`)
    ).toBeInTheDocument();
  });
  it('ensure that clicking the close button hides the component', async () => {
    await act(async () => {
      await renderCardDetails();
    });
    const card = await screen.findByTestId('closeDetailsBtn');
    await act(async () => {
      await fireEvent.click(card);
    });

    expect(onCardClose).toHaveBeenCalledOnce();
  });
});
