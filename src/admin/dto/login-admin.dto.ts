import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
