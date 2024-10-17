import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { InventoryService } from '../inventory/inventory.service';
import { Inventory } from '../inventory/entities/inventory.entity';
import { OrderCodeService } from '../order-code/order-code.service';
import { MailsService } from '../mails/mails.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly mailsService: MailsService,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private readonly usersService: UsersService,
    private readonly inventoryService: InventoryService,
    private readonly orderCodeService: OrderCodeService,
  ) {}

async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
  const { userEmail, products, priceTotal, nameCli, cliente, nomCli, rif, comen1, comen2, status, dtot_ped } = createOrderDto;

  // Obtén el codven usando el email del usuario
  const codven = userEmail;

  // Obtén el usuario usando el email del usuario
  const user = await this.usersService.findOneByEmail(userEmail);
  if (!user) {
    throw new NotFoundException(`User with email ${userEmail} not found`);
  }

  // Obtén el rol del usuario
  const roleUser = user.role;

  // Genera el código automáticamente usando el OrderCodeService
  const codigo = await this.orderCodeService.getNextCode();

  // Verifica si los productos existen y prepara los productos con cantidades
  const productEntities = await Promise.all(
    products.map(async (p) => {
      const product = await this.inventoryService.findOne(p.productId);
      if (!product) {
        throw new BadRequestException(`Product ${p.productId} not found`);
      }
      if (product.cant < p.quantity) {
        throw new BadRequestException(`Insufficient quantity for product ${p.productId}`);
      }
      return { product, quantity: p.quantity };
    })
  );
  //asigna tipo de cliente dependiendo el rol del user logueado
  let tipeClient: string;
  if(roleUser==="tecnico"){
    tipeClient = "Vendedor"
  }
  else if(roleUser==="user"){
    tipeClient = "Cliente"
  }
  // Crea el pedido
  const order = this.orderRepository.create({
    codigo,
    priceTotal,
    nameCli,
    cliente,
    nomCli,
    rif,
    codven, // Usa el email directamente como codven
    comen1,
    comen2,
    status,
    dtot_ped,
    orderProducts: productEntities.map(({ product, quantity }) => {
      const orderProduct = new OrderProduct();
      orderProduct.product = product;
      orderProduct.quantity = quantity;
      return orderProduct;
    })
  });

  // Guarda el pedido y las relaciones
  const savedOrder = await this.orderRepository.save(order);

  const formattedPriceTotal = parseFloat(savedOrder.priceTotal).toFixed(2);
      // Enviar el correo después de crear la orden
    if(tipeClient==="Vendedor"){
      await this.mailsService.sendClaimVerificationEmail({
        email: 'aaronsandoval16@gmail.com',
        claimDetails: {
          title: `¡¡¡NUEVO PEDIDO!!! `,
          description: `Haz recibido un nuevo pedido del Vendedor 
          código nro: ${savedOrder.codven} para el cliente ${savedOrder.nameCli}
          cuyo monto total es: ${formattedPriceTotal} BS Puedes verificar su existencia
          en el sistema local con el código ${savedOrder.codigo} para cargarlo y continuar el proceso.`,
          createdAt: new Date(),
        },
      });
    }
    else if(tipeClient==="Cliente"){
      await this.mailsService.sendClaimVerificationEmail({
        email: 'aaronsandoval16@gmail.com',
        claimDetails: {
          title: `¡¡¡NUEVO PEDIDO!!! `,
          description: `Haz recibido un nuevo pedido del cliente ${savedOrder.nameCli} cuyo monto total es: ${savedOrder.priceTotal} 
          Puedes verificar su existencia en el sistema local con el código ${savedOrder.codigo} para cargarlo y continuar el proceso.`,
          createdAt: new Date(),
        },
      });
    }

  // Actualiza la cantidad de productos en el inventario
  await Promise.all(
    productEntities.map(async ({ product, quantity }) => {
      product.cant -= quantity;
      await this.inventoryService.update(product.id, { cant: product.cant });
    })
  );

  return this.orderRepository.findOne({
    where: { id: savedOrder.id },
    relations: ['user', 'orderProducts', 'orderProducts.product'],
  });
}

async findAll(): Promise<Order[]> {
  return this.orderRepository.find({
    relations: ['products', 'orderProducts.product', 'user'],
  });
}

async findOne(id: string): Promise<Order> {
  return this.orderRepository.findOne({
    where: { id },
    relations: ['products', 'orderProducts.product', 'user'],
  });
}

  async remove(id: string) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return this.orderRepository.softRemove(order);
  }
}
