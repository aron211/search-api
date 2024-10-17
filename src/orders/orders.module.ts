import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersController } from './orders.controller';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { InventoryModule } from '../inventory/inventory.module';
import { OrderCode } from '../order-code/entities/order-code.entity';
import { OrderCodeService } from '../order-code/order-code.service';
import { OrderCodeModule } from '../order-code/order-code.module';
import { MailsService } from '../mails/mails.service';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [
    ConfigModule,
    FirebaseModule,
    UsersModule,
    OrderProduct,
    InventoryModule,
    OrderCodeModule,
    MailsModule,
    TypeOrmModule.forFeature([Order, OrderProduct, User, OrderCode]),
    forwardRef(() => AuthModule),

  ],
  controllers: [OrdersController],
  providers: [OrdersService,OrderCodeService],
  exports: [OrdersService,OrderCodeService],
})
export class OrdersModule {}
