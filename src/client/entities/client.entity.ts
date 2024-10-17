import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique,
    JoinColumn
  } from 'typeorm';
  import { Vendor } from 'src/vendors/entities/vendor.entity';
  @Entity()
export class Client{
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true, nullable: false })
    codigo: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column({ unique: true, nullable: false })
    rif: string;

    @Column({ nullable: true })
    address: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    descuento: string;

    @Column({ nullable: true })
    codven: string;

    @ManyToOne(() => Vendor, vendor => vendor.clients)
    vendor: Vendor;

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
    // @ManyToMany(() => Vendor, (vendor) => vendor.clients)
    // vendors: Vendor[];

}