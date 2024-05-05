import { PrismaClient } from '@prisma/client';

class Prisma extends PrismaClient {
  static prisma: PrismaClient | null = null;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.prisma) {
      return (this.prisma = new PrismaClient());
    }

    return this.prisma;
  }
}

export const db = Prisma.getInstance();
