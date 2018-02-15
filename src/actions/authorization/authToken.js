const authToken = {
  setToken(token) {
    localStorage.setItem('authorizationToken', `Bearer ${token}`);
  },
  getToken() {
    return localStorage.getItem('authorizationToken');
  },
  clearToken() {
    // debugger;// eslint-disable-line
    localStorage.clear();
  },
  hasToken() {
    return !!authToken.getToken();
  },
};

export default authToken;
