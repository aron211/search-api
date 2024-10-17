import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    Unique
  } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { OrderProduct } from './order-product.entity';

  @Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true, nullable: false })
    codigo: string;

    @Column({ nullable: true })
    nameCli: string;
  
    @Column({nullable: false })
    priceTotal: string;
  
    @Column()
    cliente: string;
    
    @Column()
    nomCli: string;

    @Column()
    rif: string;

    @Column()
    codven: string;

    @Column({ nullable: true })
    comen1: string;

    @Column({ nullable: true })
    comen2: string;
    
    @Column({ nullable: true })
    status: string;

    @Column()
    dtot_ped: string;
    
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

    // @ManyToOne(() => User, user => user.order, { eager: true })
    // user: User;

    @ManyToMany(() => Inventory)
    @JoinTable()
    products: Inventory[];

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { cascade: true })
    orderProducts: OrderProduct[];
}
