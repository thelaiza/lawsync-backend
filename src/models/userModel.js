// simulação de um banco de dados de usuários em memória
const users = [];
let currentId = 1;

export const findUserByEmail = async (email) => {
  return users.find((user) => user.email === email);
};

export const createUser = async (userData) => {
  const newUser = { id: currentId++, ...userData };
  users.push(newUser);
  return newUser;
};