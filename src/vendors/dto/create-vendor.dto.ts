import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEmail, } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  codven: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
  // @IsEmail()

  @IsNotEmpty()
  @IsString()
  ci: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

//   @Transform(({ value }) => value.trim())
//   @IsEmail()
//   email: string;

  @IsOptional()
  @IsString()
  phone: string;
}
