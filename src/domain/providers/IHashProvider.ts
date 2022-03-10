export interface IHashProvider {
  hash(toHash: string): Promise<string>;
}
