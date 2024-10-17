import {  Injectable,
          BadRequestException,
          UnauthorizedException,
          NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { PatchType } from '../common/enums/patch.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly configService: ConfigService,
  ) { }

  // create(createClientDto: CreateClientDto) {
  //   return this.clientRepository.save(createClientDto);
  //   // return 'This action adds a new client';
  // }
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { codven } = createClientDto;
    const vendor = await this.vendorRepository.findOneBy({ codven });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const client = this.clientRepository.create({
      ...createClientDto,
      vendor,
    });

    return this.clientRepository.save(client);
  }
  async findAll() {
    // return await this.clientRepository.find();
    const clients = await this.clientRepository.find({ relations: ['vendor'] });
    return clients.map(client => ({
        ...client,
        vendorId: client.vendor ? client.vendor.id : null,
    }));

  }

  findOneByName(name: string) {
    return this.clientRepository.findOneBy({ name });
  }

  findOneById(id: string) {
    return this.clientRepository.findOne({ 
      where: { id },
      select: [
        'id',
        'name',
        'rif',
        'address',
        'phone',
        'email',
        'descuento',
        'codven',
        'createdAt',
        'updatedAt',
      ],
      relations: ['vendor'],
     });
    return `This action returns a #${id} client`;
  }

  async findOne(id: string) {

    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new BadRequestException('user not found ');
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    if (!client) {
      throw new UnauthorizedException('id is wrong');
    }
    return await this.clientRepository.update(id, { ...UpdateClientDto });
    return `This action updates a #${id} client`;
  }

  async  remove(id: string) {
    await this.findOne(id);
    return this.clientRepository.softRemove({ id });
    return `This action removes a #${id} client`;
  }
}
