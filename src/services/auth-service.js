import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/auth/';
class AuthService {
  async login(user) {
    return await axios
      .post('api/auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(user) {
    return await axios
      .post('api/auth/register', {
        username: user.username,
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new AuthService();
