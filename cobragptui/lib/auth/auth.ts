export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  subscription?: {
    status: 'active' | 'inactive' | 'trial';
    plan: 'free' | 'pro' | 'enterprise';
    expiresAt: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

// Mock authentication service
export const mockAuthService = {
  async login({ email, password }: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'user',
      subscription: {
        status: 'trial',
        plan: 'free',
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      }
    };

    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async register({ email, password, name }: RegisterCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      subscription: {
        status: 'trial',
        plan: 'free',
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      }
    };

    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('user');
  },

  async getUser(): Promise<User | null> {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    return JSON.parse(userData);
  }
};