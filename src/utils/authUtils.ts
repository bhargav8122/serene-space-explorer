
interface User {
  name?: string;
  email: string;
  password: string;
}

export const registerUser = (userData: User): boolean => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existingUser = users.find((user: User) => user.email === userData.email);
  
  if (existingUser) {
    return false;
  }
  
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
};

export const loginUser = (email: string, password: string): boolean => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((user: User) => user.email === email && user.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

export const getCurrentUser = (): User | null => {
  const userString = localStorage.getItem('currentUser');
  return userString ? JSON.parse(userString) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};
