import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pagination } from '../components/pagination/Pagination';

describe('tests for the Pagination component', () => {
  const onPageChange = vi.fn();
  const renderPagination = (currentPage: number, totalPages: number) => {
    return render(
      <Router>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Router>
    );
  };

  it('renders pagination buttons correctly', async () => {
    renderPagination(3, 43);

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
  });

  it('calls onPageChange with the correct parameters when changing pages', async () => {
    await renderPagination(3, 43);

    const page3Button = screen.getByText('3');
    await act(async () => {
      page3Button.click();
    });

    expect(onPageChange).toHaveBeenCalledWith(3);

    const nextButton = screen.getByText('Next');
    await act(async () => {
      nextButton.click();
    });

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('displays the correct page numbers and ellipsis', async () => {
    await act(async () => {
      await renderPagination(10, 43);
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
  });

  it('does not display Prev button on the first page', async () => {
    renderPagination(1, 43);

    expect(screen.queryByText('Prev')).not.toBeInTheDocument();
  });

  it('does not display Next button on the last page', async () => {
    await renderPagination(43, 43);

    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('displays the first and last page buttons when not in the current range', async () => {
    renderPagination(5, 10);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
