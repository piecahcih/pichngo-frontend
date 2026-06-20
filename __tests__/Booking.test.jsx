import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import BookInfo from "../src/pages/BookInfo";
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

// 1. Mock Stripe
vi.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }) => <div data-testid="stripe-elements">{children}</div>,
  PaymentElement: () => <div data-testid="payment-element">Payment Element</div>,
  useStripe: () => ({
    confirmPayment: vi.fn().mockResolvedValue({
      error: null,
      paymentIntent: { status: 'succeeded', id: 'pi_123' }
    })
  }),
  useElements: () => ({})
}));

vi.mock('../src/configs/stripe', () => ({
  stripePromise: Promise.resolve({})
}));

// 2. Mock SweetAlert so it doesn't block
vi.mock('../src/components/swal/WasBookAlert', () => ({
    WasBookSwal: vi.fn()
}));
vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn()
    }
}));

// 3. Mock Stores
const mockCreatePaymentIntent = vi.fn().mockResolvedValue({ clientSecret: 'secret_123' });
const mockPricePreviewShown = vi.fn().mockResolvedValue();
const mockCreateBooking = vi.fn().mockResolvedValue();
const mockResetCurrentBooking = vi.fn();
const mockSetGuestList = vi.fn();
const mockSetPromoCode = vi.fn();

vi.mock('../src/stores/bookingStore', () => {
    const storeHookMock = (selector) => {
        const state = {
            pricePreview: { finalPrice: 1000, originalPrice: 1200, discountAmount: 200, taxesAndFees: 100 },
            guestList: [{ firstName: "John", lastName: "Doe" }],
            paymentMethod: "CREDIT_CARD",
            promoCode: "",
            currentBooking: { checkin: "2023-10-01", checkout: "2023-10-05", nightCount: 4, guest: 2, room: 1, roomId: 101 },
            pricePreviewShown: mockPricePreviewShown,
            createPaymentIntent: mockCreatePaymentIntent,
            createBooking: mockCreateBooking,
            resetCurrentBooking: mockResetCurrentBooking,
            setGuestList: mockSetGuestList,
            setPromoCode: mockSetPromoCode
        };
        return selector ? selector(state) : state;
    };
    
    storeHookMock.getState = () => ({
        createBooking: mockCreateBooking,
        resetCurrentBooking: mockResetCurrentBooking,
        setGuestList: mockSetGuestList,
        setPromoCode: mockSetPromoCode
    });
    
    return { default: storeHookMock };
});

vi.mock('../src/stores/hotelStore', () => {
    const storeHookMock = (selector) => {
        const state = {
            hotels: [{
                id: 1,
                name: "Test Hotel",
                hotelImg: { img1: "test.jpg" },
                address: "Test Address",
                location: { city: "Test City", country: "Test Country" },
                rooms: [{ id: 101, roomType: "Deluxe", price: 200, pictures: [] }]
            }]
        };
        return selector ? selector(state) : state;
    };
    return { default: storeHookMock };
});

vi.mock('../src/stores/userStore', () => {
    const storeHookMock = (selector) => {
        const state = {
            user: { email: "test@user.com", Point: 500 },
            travelerInfo: [{ firstName: "Jane", lastName: "Smith" }]
        };
        return selector ? selector(state) : state;
    };
    return { default: storeHookMock };
});

const mockCalculateBookingRewards = vi.fn();
vi.mock('../src/stores/rewardStore', () => {
    const storeHookMock = (selector) => {
        const state = {
            previewRewards: { rewardPoints: 100 },
            calculateBookingRewards: mockCalculateBookingRewards
        };
        return selector ? selector(state) : state;
    };
    return { default: storeHookMock };
});

const mockGetDiscountByCode = vi.fn().mockResolvedValue({ data: { discount: 200 } });
vi.mock('../src/stores/discountStore', () => {
    const storeHookMock = (selector) => {
        const state = {
            getDiscountByCode: mockGetDiscountByCode
        };
        return selector ? selector(state) : state;
    };
    return { default: storeHookMock };
});

vi.mock('../src/stores/currencyStore', () => {
    const storeHookMock = (selector) => {
        const state = {
            currency: 'USD',
            rates: { USD: 1 },
            symbols: { USD: '$' },
            locales: { USD: 'en-US' }
        };
        return selector ? selector(state) : state;
    };
    storeHookMock.getState = () => ({
        currency: 'USD',
        rates: { USD: 1 },
        symbols: { USD: '$' },
        locales: { USD: 'en-US' }
    });
    return { default: storeHookMock };
});

describe('Booking Flow Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows hotel details', async () => {
        render(
            <MemoryRouter>
                <BookInfo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('stripe-elements')).toBeInTheDocument();
        });

        // BHotelInfoCard
        expect(screen.getByText('Test Hotel')).toBeInTheDocument();
        expect(screen.getByText('Deluxe')).toBeInTheDocument();
    });

    it('shows guest info and allows guest to add traveler info', async () => {
        render(
            <MemoryRouter>
                <BookInfo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Guest Information/i)).toBeInTheDocument();
        });

        const inputs = screen.getAllByPlaceholderText('Use only English letters');
        const firstNameInput = inputs[0];
        
        await userEvent.clear(firstNameInput);
        await userEvent.type(firstNameInput, 'Alice');
        expect(firstNameInput).toHaveValue('Alice');
    });

    it('shows discount input and price details', async () => {
        render(
            <MemoryRouter>
                <BookInfo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('stripe-elements')).toBeInTheDocument();
        });

        // BDiscount
        expect(screen.getByPlaceholderText(/Enter more promo code/i)).toBeInTheDocument();

        // BPrice
        expect(screen.getByText(/Price Details/i)).toBeInTheDocument();
        expect(screen.getByText(/Taxes & fees/i)).toBeInTheDocument();
        
        // BRewards
        expect(screen.getByText(/Rewards/i)).toBeInTheDocument();
        expect(screen.getByText(/100 Pich Coins/i)).toBeInTheDocument();
    });

    it('calculates rewards', async () => {
        render(
            <MemoryRouter>
                <BookInfo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockCalculateBookingRewards).toHaveBeenCalledWith(1000);
        });
    });

    it('payment runs successfully and navigates to /book/success', async () => {
        render(
            <MemoryRouter>
                <BookInfo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('stripe-elements')).toBeInTheDocument();
        });

        const confirmBtn = screen.getByRole('button', { name: /Confirm Your Reservation/i });
        await userEvent.click(confirmBtn);

        // createBooking should be called
        await waitFor(() => {
            expect(mockCreateBooking).toHaveBeenCalled();
        });
        
        // Wait for navigation timeout (1200ms in BookInfo)
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/book/success');
        }, { timeout: 2000 });
    });
});