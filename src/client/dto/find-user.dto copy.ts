import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
