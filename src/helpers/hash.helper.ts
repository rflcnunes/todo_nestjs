import { hash } from 'bcryptjs';

const hashWithBcrypt = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

export const HashHelper = {
  hashWithBcrypt,
};
