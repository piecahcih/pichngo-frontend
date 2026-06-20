import { test, expect, vi, describe } from "vitest";
import Header from "../src/components/Header";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

//Mock store triggers
const mockLogout = vi.fn();
const mockSetCurrency = vi.fn();


vi.mock('../src/stores/userStore', () => ({
    default: (selector) => {
        const state = {
            user: { profileImg: 'test-profile-pic.png' },
            logout: mockLogout
        };
        return selector(state);
    }
}));

vi.mock('../src/stores/currencyStore', () => ({
    default: (selector) => {
        const state = {
            currency: 'THB',
            setCurrency: mockSetCurrency,
            rates: { 
                THB: 1.0, 
                USD: 0.027, 
                EUR: 0.025, 
                JPY: 4.0,
                SGD: 0.036   
            },
            symbols: { 
                THB: '฿', 
                USD: '$', 
                EUR: '€',
                JPY: '¥',
                SGD: 'SGD'
            }
        };
        return selector(state);
    }
}));

// Mock sub-components to isolate Header testing
vi.mock('../src/components/SearchBarNav', () => ({
    default: () => <div data-testid="mock-searchbar-nav">Mock SearchBarNav</div>
}));

vi.mock('../src/components/SearchBarHome', () => ({
    default: () => <div data-testid="mock-searchbar-home">Mock SearchBarHome</div>
}));

vi.mock('../src/components/profileCPN/ProfilePic', () => ({
    default: ({ imgSrc }) => <img alt="profile" src={imgSrc} data-testid="mock-profile-pic" />
}));

describe('Header Component Tests', () => {

    test('renders Logo "Pich & Go"', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByText('Pich & Go')).toBeInTheDocument();
    });

    test('renders the Searchbar component', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByTestId('mock-searchbar-nav')).toBeInTheDocument();
    });

    test('currency dropdown options are visible and trigger setCurrency on click', async () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('THB')).toBeInTheDocument();

        const expectedCurrencies = ['THB (฿)', 'USD ($)', 'EUR (€)', 'JPY (¥)', 'SGD (SGD)'];
        expectedCurrencies.forEach(currencyText => {
            expect(screen.getByText(currencyText)).toBeInTheDocument();
        });

        const usdOption = screen.getByText('USD ($)');
        await userEvent.click(usdOption);
        expect(mockSetCurrency).toHaveBeenCalledWith('USD');
    });

    test('dropdown profile shows link options and triggers logout action', async () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const profilePic = screen.getByTestId('mock-profile-pic');
        expect(profilePic).toHaveAttribute('src', 'test-profile-pic.png');

        const profileLink = screen.getByText('Profile');
        expect(profileLink).toBeInTheDocument();
        expect(profileLink).toHaveAttribute('href', '/account/profile');

        const signOutBtn = screen.getByText('Sign out');
        expect(signOutBtn).toBeInTheDocument();

        await userEvent.click(signOutBtn);
        expect(mockLogout).toHaveBeenCalled();
    });
});


////TEST
//logo
//searchbarnav component
//currency
//profile dropdown