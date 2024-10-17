import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { EnvCofiguration } from './config/env.config';
// import { PromotionsModule } from './promotions/promotions.module';
// import { RequestsModule } from './requests/requests.module';

// import { ServicesModule } from './services/services.module';
// import { ReviewsModule } from './reviews/reviews.module';
// import { TypeserviceModule } from './typeservice/typeservice.module';
// import { SuggestionsModule } from './suggestions/suggestions.module';
// import { ClaimsModule } from './claims/claims.module';
// import { MailsModule } from './mails/mails.module';
// import { EquipsModule } from './equips/equips.module';
// import { ClientModule } from './client/client.module';
import { InventoryModule } from './inventory/inventory.module';
// import { OrdersModule } from './orders/orders.module';
// import { VendorsModule } from './vendors/vendors.module';
// import { OrderCodeModule } from './order-code/order-code.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvCofiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    UsersModule,
    AuthModule,
    FirebaseModule,
    // PromotionsModule,
    // RequestsModule,
    // ServicesModule,
    // ReviewsModule,
    // TypeserviceModule,
    // SuggestionsModule,
    // ClaimsModule,
    // ClientModule,
    InventoryModule,
    // OrdersModule,
    // MailsModule,
    // VendorsModule,
    // OrderCodeModule,
    // EquipsModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }



