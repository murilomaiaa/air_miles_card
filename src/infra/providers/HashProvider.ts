import bcrypt from 'bcrypt';
import { IHashProvider } from '@/domain/providers';

export class HashProvider implements IHashProvider {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}
