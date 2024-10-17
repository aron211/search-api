import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Vendor } from './entities/vendor.entity';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
// import { ClientModule } from '../client/client.module';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Vendor]),
    // ClientModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [VendorsController],
  providers: [VendorsService]
})
export class VendorsModule {}
