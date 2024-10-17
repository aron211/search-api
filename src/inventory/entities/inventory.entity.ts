import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany
  } from 'typeorm';
  import { Order } from '../../orders/entities/order.entity';
  @Entity()
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({unique: true, nullable: false })
    codigo: string;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({nullable: true })
    marca: string;
    
    @Column()
    cant: number;

    @Column({ type: 'float', nullable: true })
    priceD: number;
    
    @Column({ type: 'float', nullable: true })
    cost: number;
    
    @Column({nullable: true })
    sucursal: string;
  
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

    // @ManyToMany(() => Order, order => order.products)
    // orders: Order[];
}
