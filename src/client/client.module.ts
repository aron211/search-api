import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Client } from './entities/client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Client, Vendor]),
    VendorsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [TypeOrmModule], 
})
export class ClientModule {}
