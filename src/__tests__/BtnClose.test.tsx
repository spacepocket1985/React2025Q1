import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BtnClose } from '@components/btnClose/BtnClose';

vi.mock('@hooks/storeHooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe('BtnClose Component', () => {
  it('renders the close button', () => {
    render(<BtnClose />);

    const button = screen.getByTestId('closeDetailsBtn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('X');
  });
});
