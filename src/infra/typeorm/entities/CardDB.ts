import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreditCardCompanyDB } from './CreditCardCompanyDB';

@Entity('cards')
export class CardDB {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  number!: string;

  @Column({ name: 'holder_name' })
  holderName!: string;

  @Column({ name: 'holder_email' })
  holderEmail!: string;

  @Column({ name: 'expiration_month' })
  expirationMonth!: string;

  @Column({ name: 'expiration_year' })
  expirationYear!: string;

  @Column()
  cvv!: string;

  @ManyToOne(() => CreditCardCompanyDB, { eager: true })
  @JoinColumn({ name: 'credit_card_company_id' })
  creditCardCompany!: CreditCardCompanyDB;

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
