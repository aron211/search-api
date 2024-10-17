import {  Injectable,
          BadRequestException,
          UnauthorizedException,
          NotFoundException
 } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { CreateClientForVendorDto  } from './dto/create-client-for-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { Client } from '../client/entities/client.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly configService: ConfigService,
  ) { }
  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorRepository.create(createVendorDto);
    return this.vendorRepository.save(vendor);
  }

  async findAll() {
    return await this.vendorRepository.find();
    return `This action returns all vendors`;
  }

  async findOne(id: string) {
    const vendor = await this.vendorRepository.findOneBy({ id });
    if (!vendor) {
      throw new BadRequestException('user not found ');
    }
    return vendor;
  }

//   async addClientToVendor(userId: string, createClientForVendorDto: CreateClientForVendorDto) {
//     console.log(`User ID from token: ${userId}`);
//     const vendor = await this.vendorRepository.findOne({ where: { id: userId } });
//     if (!vendor) {
//         throw new NotFoundException('Vendor not found');
//     }

//     let client: Client;
//     if (createClientForVendorDto.clientId) {
//         client = await this.clientRepository.findOneBy({ id: createClientForVendorDto.clientId });
//         if (!client) {
//             throw new NotFoundException('Client not found');
//         }
//     } else {
//         client = this.clientRepository.create(createClientForVendorDto);
//         await this.clientRepository.save(client);
//     }

//     vendor.clients = vendor.clients || [];
//     vendor.clients.push(client);
//     return await this.vendorRepository.save(vendor);
// }
async findClientesByVendedor(vendorId: string): Promise<Client[]> {
  const vendor = await this.vendorRepository.findOne({
    where: { id: vendorId },
    relations: ['clients'],
  });

  if (!vendor) {
      throw new NotFoundException('Vendor not found');
  }

  return vendor.clients;
}
async getClientesByCi(ci: string) {
  return await this.vendorRepository.findOne({
    where: { ci },
    relations: ['clients'],
  });
}
// async findClientesByVendedor(vendorId: string): Promise<Vendor> {
//   const vendor = await this.vendorRepository.findOne({
//     where: { id: vendorId },
//     relations: ['clients'], // Asegúrate de que esto coincida con tu configuración de relaciones en tu entidad
//   });

//   if (!vendor) {
//     throw new NotFoundException('Vendor not found');
//   }

//   return vendor;
// }
  findOneById(id: string) {
    return this.vendorRepository.findOne({ 
      where: { id },
      select: [
        'id',
        'ci',
        'name',
        'lastname',
        'phone'
      ],
     });
    return `This action returns a #${id} client`;
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.findOne(id);
    if (!vendor) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.vendorRepository.update(id, { ...UpdateVendorDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.vendorRepository.softRemove({ id });
    return `This action removes a #${id} vendor`;
  }
}
