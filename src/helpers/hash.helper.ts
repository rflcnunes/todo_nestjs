import { hash, compareSync } from 'bcryptjs';

const hashWithBcrypt = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const checkPassword = (password: string, hashedPassword: string): boolean => {
  return compareSync(password, hashedPassword);
};

export const HashHelper = {
  hashWithBcrypt,
  checkPassword,
};
