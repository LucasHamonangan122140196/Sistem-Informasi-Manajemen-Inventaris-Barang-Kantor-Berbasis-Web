
const API_BASE_URL = 'http://localhost:6543/api';

export const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      if (data.success && data.token) {
        localStorage.setItem('auth_token', data.token);
        return { success: true, user: data.user, token: data.token };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registrasi gagal');
      }

      if (data.success && data.token) {
        localStorage.setItem('auth_token', data.token);
        return { success: true, user: data.user, token: data.token };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem('auth_token');
        throw new Error(data.message || 'Token tidak valid');
      }

      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      localStorage.removeItem('auth_token');
      return null;
    }
  },

  logout() {
    localStorage.removeItem('auth_token');
  }
};
