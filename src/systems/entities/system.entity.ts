import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 180 })
  url: string;

  @Column({ length: 50, nullable: true })
  icon?: string;

  @Column({ length: 60, nullable: true })
  category?: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ length: 60, nullable: true })
  responsible?: string;

  @Column({ length: 120, nullable: true })
  description?: string;

  @Column({ length: 90, nullable: true })
  techStack?: string;

  @Column({ type: 'datetime', nullable: true })
  expirationDate?: Date;

  @Column({ length: 180, nullable: true })
  dependencies?: string;

  @Column({ length: 20, default: 'Ativo' })
  status: string;

  @Column({ length: 20, default: 'Público' })
  accessLevel: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
