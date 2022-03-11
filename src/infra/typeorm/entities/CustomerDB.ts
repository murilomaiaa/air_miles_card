import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanDB } from './PlanDB';

@Entity('customers')
export class CustomerDB {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => PlanDB, { eager: true })
  @JoinColumn({ name: 'plan_id' })
  plan!: PlanDB;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;

  @Column({ name: 'updated_by', type: 'uuid' })
  updatedBy?: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;

  @Column({ name: 'deleted_by', type: 'uuid' })
  deletedBy?: string;
}
