import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  rif: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;
  // @IsEmail()

  @IsOptional()
  @IsString()
  descuento: string;

  @IsNotEmpty()
  @IsString()
  codven: string;
}
