
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique,
    ManyToMany,
    JoinTable
  } from 'typeorm';
  import { Client } from 'src/client/entities/client.entity';
  
  @Entity()
  export class Vendor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true, nullable: true })
    codven: string;
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    email: string;

    @OneToMany(() => Client, client => client.vendor)
    clients: Client[];

    @Column({ nullable: true })
    ci: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ nullable: true })
    phone: string;

    // @Column({ unique: true, nullable: false })
    // email: string;
  
    @DeleteDateColumn({ select: false })
    deletedAt: Date;
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
    // @ManyToMany(() => Client, (client) => client.vendors, { cascade: true })
    // @JoinTable()
    // clients: Client[];


}