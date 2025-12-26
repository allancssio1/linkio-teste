import { HashCompare } from '../../src/domain/cryptography/hasher-compare'
import { HashGenerate } from '../../src/domain/cryptography/hasher-generate'
import { hash as hashBcryptjs, compare as compareBcryptjs } from 'bcryptjs'

export class HasherInMemory implements HashGenerate, HashCompare {
  async hash(plain: string): Promise<string> {
    return hashBcryptjs(plain, 8)
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return compareBcryptjs(plain, hash)
  }
}
