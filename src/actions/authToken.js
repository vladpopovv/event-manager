const authToken = {
  setToken(token) {
    localStorage.setItem('authorizationToken', `Bearer ${token}`);
  },
  getToken() {
    return localStorage.getItem('authorizationToken');
  },
  clearToken() {
    localStorage.clear();
  },
  hasToken() {
    return !!authToken.getToken();
  },
};

export default authToken;
