import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClientForVendorDto {
    @IsOptional()
    @IsUUID()
    clientId?: string;

    @IsOptional()
    @IsString()
    codigo?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    rif?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}