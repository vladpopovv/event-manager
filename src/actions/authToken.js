export default {
  setToken(token) {
    localStorage.setItem('authorizationToken', `Bearer ${token}`);
  },
  getToken() {
    return localStorage.getItem('authorizationToken');
  },
  clearToken() {
    localStorage.clear();
  },
};
