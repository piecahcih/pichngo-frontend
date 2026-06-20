import { test, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import SearchBarHome from "../src/components/SearchBarHome";


const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

const mockGetAllHotels = vi.fn();
const mockSearchHotels = [
    { id: '1', name: 'Grand Bangkok Hotel', city: 'Bangkok' },
    { id: '2', name: 'Phuket Beach Resort', city: 'Phuket' }
];

vi.mock('../src/stores/hotelStore', () => ({
    default: (selector) => {
        const state = {
            searchHotels: mockSearchHotels,
            getAllHotels: mockGetAllHotels
        };
        return selector(state);
    }
}));


vi.mock('../src/components/DualCalendar', () => ({
    default: ({ onRangeSelect }) => (
        <div data-testid="mock-dual-calendar">
            <button
                type="button"
                data-testid="mock-select-dates-btn"
                onClick={() => onRangeSelect({ from: new Date('2026-07-01'), to: new Date('2026-07-05') })}
            >
                Mock Select July 1 to July 5
            </button>
        </div>
    )
}));

describe('SearchBarHome Component Tests', () => {

    test('renders SearchBarHome with its inputs and buttons', () => {
        render(
            <MemoryRouter>
                <SearchBarHome />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Where to?')).toBeInTheDocument();
        expect(screen.getByText('STAY DATES')).toBeInTheDocument();
        expect(screen.getByText('ROOMS')).toBeInTheDocument();
        expect(screen.getByText('GUESTS')).toBeInTheDocument();
    });

    test('shows suggestions dropdown list when user types a destination', async () => {
        render(
            <MemoryRouter>
                <SearchBarHome />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText('Where to?');
        await userEvent.type(input, 'Bang');

        expect(screen.getByText('DESTINATIONS')).toBeInTheDocument();
        expect(screen.getByText('Bangkok')).toBeInTheDocument();
        expect(screen.getByText('HOTELS')).toBeInTheDocument();
        expect(screen.getByText('Grand Bangkok Hotel')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Bangkok'));
        expect(input).toHaveValue('Bangkok');
    });

    test('opens DualCalendar and allows user to select stay dates', async () => {
        render(
            <MemoryRouter>
                <SearchBarHome />
            </MemoryRouter>
        );


        expect(screen.queryByTestId('mock-dual-calendar')).not.toBeInTheDocument();

        const stayDatesBtn = screen.getByRole('button', { name: /STAY DATES/i });
        await userEvent.click(stayDatesBtn);
        expect(screen.getByTestId('mock-dual-calendar')).toBeInTheDocument();

        await userEvent.click(screen.getByTestId('mock-select-dates-btn'));

        expect(screen.getByText('Jul 1 - Jul 5')).toBeInTheDocument();
    });

    test('allows user to open guest counter and adjust rooms and guests', async () => {
        render(
            <MemoryRouter>
                <SearchBarHome />
            </MemoryRouter>
        );

        const guestsSection = screen.getByRole('button', { name: /GUESTS/i });
        await userEvent.click(guestsSection);

        expect(screen.getByText('Rooms')).toBeInTheDocument();
        expect(screen.getByText('Adults')).toBeInTheDocument();
        expect(screen.getByText('Children')).toBeInTheDocument();

        const plusButtons = screen.getAllByRole('button', { name: '+' });

        await userEvent.click(plusButtons[0]); 
        await userEvent.click(plusButtons[1]); 

        expect(screen.getByText('2 Rooms')).toBeInTheDocument();
        expect(screen.getByText('2 Guests')).toBeInTheDocument();

        // Reset counts
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        await userEvent.click(resetBtn);

        expect(screen.getByText('1 Room')).toBeInTheDocument();
        expect(screen.getByText('1 Guest')).toBeInTheDocument();
    });

    test('submitting search form navigates user to search page with correct parameters', async () => {
        render(
            <MemoryRouter>
                <SearchBarHome />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText('Where to?');
        await userEvent.type(input, 'Bang');
        await userEvent.click(screen.getByText('Bangkok'));

        const stayDatesBtn = screen.getByRole('button', { name: /STAY DATES/i });
        await userEvent.click(stayDatesBtn);
        await userEvent.click(screen.getByTestId('mock-select-dates-btn'));

        const form = screen.getByRole('textbox', { name: '' }).closest('form');
        const submitBtn = form.querySelector('button[type="submit"]');
        await userEvent.click(submitBtn);

        expect(mockNavigate).toHaveBeenCalledWith(
            '/hotels/bangkok/?checkin=2026-07-01&checkout=2026-07-05&room=1&adult=1'
        );
    });
});


////TEST
//suggestionafterinput
//calendar
//room&guests
//searchbutton