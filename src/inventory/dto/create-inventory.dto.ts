import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt, IsUUID } from 'class-validator';
export class CreateInventoryDto {
    @IsNotEmpty()
    @IsString()
    codigo: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    marca: string;
    
    @IsInt()
    cant?: number;

    @IsNumber()
    priceD?: number;
    
    @IsNumber()
    cost?: number;

    @IsNotEmpty()
    @IsString()
    sucursal: string;
}
