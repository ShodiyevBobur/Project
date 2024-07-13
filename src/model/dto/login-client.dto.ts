import { IsNotEmpty, IsString } from 'class-validator';

export class LoginClientDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
