import { IsNotEmpty, IsOptional, IsString, IsUUID , IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductQuantityDto {
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
    // @IsOptional()
    // @IsString()
    // codigo?: string;
  
    @IsNotEmpty()
    @IsString()
    nameCli: string;
  
    @IsNotEmpty()
    @IsString()
    priceTotal: string;

    // @IsNotEmpty()
    // @IsUUID()
    // userId: string;

    @IsNotEmpty()
    @IsString()
    userEmail: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductQuantityDto)
    products: ProductQuantityDto[];

    @IsNotEmpty()
    @IsString()
    cliente: string;

    @IsNotEmpty()
    @IsString()
    nomCli: string;

    @IsNotEmpty()
    @IsString()
    rif: string;

    @IsNotEmpty()
    @IsString()
    codven: string;

    @IsOptional()
    @IsString()
    comen1?: string;

    @IsOptional()
    @IsString()
    comen2?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsNotEmpty()
    @IsString()
    dtot_ped: string;
}
