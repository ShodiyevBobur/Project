import { IsString, IsNumber, IsPositive } from "class-validator";

export class CreateCarDto {
  @IsString()
  car_number: string;

  @IsString()
  model: string;

  @IsString()
  color: string;

  @IsString()
  photo: string;

  @IsString()
  car_type: string;

  @IsString()
  tex_passport: string;
}
