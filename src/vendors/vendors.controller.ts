import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { CreateClientForVendorDto } from './dto/create-client-for-vendor.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.ADMIN, Role.TECNICHAL)
  findAll() {
    return this.vendorsService.findAll();
  }
  // @Get('clientes/:vendorId')
  // async getClientesByVendedor(@Param('vendorId') id: string) {
  //   return await this.vendorsService.findClientesByVendedor(id);
  // }
//   @Get('clientes/ci/:ci')
// async getClientesByCi(@Param('ci') ci: string) {
//   return this.vendorsService.getClientesByCi(ci);
// }
  // async findClientesByVendedor(vendorId: string): Promise<Vendor> {
  //   const vendor = await this.vendorsService.findOne({
  //     where: { id: vendorId },
  //     relations: ['clients'],
  //   });
  
  //   console.log("Vendor with clients:", vendor); // Imprime el vendor con los clientes
  //   return vendor;
  // }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update(id, updateVendorDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.vendorsService.remove(id);
  }
  @Get(':vendorId/clients')
  findClientesByVendedor(@Param('vendorId') vendorId: string) {
    return this.vendorsService.findClientesByVendedor(vendorId);
  }
  // @Post(':id/clients')
  // addClientToVendor(@Param('id') id: string, @Body() createClientForVendorDto: CreateClientForVendorDto) {
  //     return this.vendorsService.addClientToVendor(id, createClientForVendorDto);
  // }
  // @ApiBearerAuth()
  // @Post('clients')
  // @Auth(Role.TECNICHAL, Role.ADMIN) // Asegúrate de que solo usuarios autenticados puedan acceder a este endpoint
  // addClientToVendor(@Req() request: Request, @Body() createClientForVendorDto: CreateClientForVendorDto) {
  //   console.log('Request user metofo post in vendor controller:', request.user);
  //   const vendorId = request.user.id; // Extrae el ID del usuario desde el request
  //   return this.vendorsService.addClientToVendor(vendorId, createClientForVendorDto);
  // }
}
