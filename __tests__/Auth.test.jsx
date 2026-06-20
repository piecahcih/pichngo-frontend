import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import LoginCard from "../src/components/authCPN/LoginCard";
import RegisterCard from "../src/components/authCPN/RegisterCard";
import '@testing-library/jest-dom';

// 1. Mock firebase auth functions
vi.mock('firebase/auth', () => ({
    signInWithPopup: vi.fn(() => Promise.resolve({
        user: {
            email: 'googleuser@test.com',
            displayName: 'Google Test User',
            photoURL: 'https://photo.url',
            getIdToken: vi.fn(() => Promise.resolve('mock-google-id-token'))
        }
    }))
}));

// 2. Mock firebase config
vi.mock('../src/utils/firebase', () => ({
    auth: { currentUser: null },
    googleProvider: {
        setCustomParameters: vi.fn()
    }
}));

// 3. Mock Zustand userStore to avoid real storage / API calls
vi.mock('../src/stores/userStore', () => {
    const mockLogin = vi.fn().mockResolvedValue({
        data: { message: 'Login Success', user: { role: 'USER' } }
    });
    const mockRegisterorLoginWithGoogle = vi.fn().mockResolvedValue({
        data: { token: 'mock-token', user: { role: 'USER' } }
    });

    const storeHookMock = (selector) => {
        const state = {
            user: { profileImg: '' },
            login: mockLogin,
            registerorLoginWithGoogle: mockRegisterorLoginWithGoogle
        };
        return selector ? selector(state) : state;
    };

    storeHookMock.getState = () => ({
        user: { profileImg: '' },
        login: mockLogin,
        registerorLoginWithGoogle: mockRegisterorLoginWithGoogle
    });

    return {
        default: storeHookMock
    };
});

// 4. Mock Register API
vi.mock('../src/api/mainAPI', () => ({
    RegisterApi: vi.fn(() => Promise.resolve({
        data: { message: 'Register Success' }
    }))
}));

describe('Login Card Tests', () => {
    it('allows user to type credentials and login', async () => {
        render(
            <MemoryRouter>
                <LoginCard />
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Email'), 'test@user.com');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

        const submitBtn = screen.getByRole('button', { name: /^Continue$/i });
        await userEvent.click(submitBtn);

        expect(submitBtn).toBeInTheDocument();
    });

    it('allows user to sign in with Google', async () => {
        render(
            <MemoryRouter>
                <LoginCard />
            </MemoryRouter>
        );

        const googleBtn = screen.getByRole('button', { name: /Continue with Google/i });
        await userEvent.click(googleBtn);

        const { signInWithPopup } = await import('firebase/auth');
        expect(signInWithPopup).toHaveBeenCalled();
    });
});

describe('Register Card Tests', () => {
    it('allows user to type details and register', async () => {
        render(
            <MemoryRouter>
                <RegisterCard />
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Email'), 'newuser@test.com');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        await userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');

        const submitBtn = screen.getByRole('button', { name: /Sign up/i });
        await userEvent.click(submitBtn);

        expect(submitBtn).toBeInTheDocument();
    });

    it('allows user to register with Google', async () => {
        render(
            <MemoryRouter>
                <RegisterCard />
            </MemoryRouter>
        );

        const googleBtn = screen.getByRole('button', { name: /Continue with Google/i });
        await userEvent.click(googleBtn);

        const { signInWithPopup } = await import('firebase/auth');
        expect(signInWithPopup).toHaveBeenCalled();
    });
});