import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderProducts)
    order: Order;

    @ManyToOne(() => Inventory)
    product: Inventory;

    @Column()
    quantity: number;
}