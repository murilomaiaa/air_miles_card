import { readdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { Connection, createConnection } from 'typeorm';
import env from '@/main/config/env';

export class TypeormHelper {
  private connection?: Connection;
  private static instance?: TypeormHelper;

  static getInstance(): TypeormHelper {
    if (!this.instance) {
      this.instance = new TypeormHelper();
    }

    return this.instance;
  }

  async connect(): Promise<void> {
    const migrations = await this.getMigrations();
    const entities = await this.getEntities();
    this.connection = await createConnection({
      ...env.db,
      migrations,
      type: 'postgres',
      entities,
    });

    await this.connection.runMigrations();
  }
  private async getMigrations() {
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrations: any[] = [];
    const dirExists = fs.existsSync(migrationsDir);
    if (dirExists) {
      const files = await readdir(migrationsDir, { encoding: 'utf-8' });
      files
        .map(file => `${migrationsDir}/${file}`)
        .forEach(async file => {
          const imports = await import(file);
          migrations.push(imports.default);
        });
    }
    return migrations;
  }
  private async getEntities() {
    const entitiesDir = path.join(__dirname, 'entities');
    const entities: any[] = [];
    const dirExists = fs.existsSync(entitiesDir);
    if (dirExists) {
      const files = await readdir(entitiesDir, { encoding: 'utf-8' });
      files
        .filter(file => file.includes('DB.'))
        .forEach(async file => {
          console;
          const imports = await import(`${entitiesDir}/${file}`);
          const [className] = file.split('.');
          entities.push(imports[className]);
        });
    }

    return entities;
  }
}
