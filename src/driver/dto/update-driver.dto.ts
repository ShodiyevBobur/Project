import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { IsUzbekPassportNumber } from "../../decorators/validator/IsUzbekPassportNumber";

export class UpdateDriverDto {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the driver",
  })
  @ApiProperty({ example: "John", description: "The first name of the driver" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: "Doe", description: "The last name of the driver" })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({ example: 30, description: "The age of the driver" })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    example: "+123456789",
    description: "The phone number of the driver",
  })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone?: string;

  @ApiProperty({ example: "photo.jpg", description: "The photo of the driver" })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    example: "A1234567",
    description: "The passport number of the driver",
  })
  @IsOptional()
  @IsUzbekPassportNumber()
  passport?: string;

  @ApiProperty({
    example: "image",
    description: "The driving license photo of the driver",
  })
  prava?: string;

  @ApiProperty({
    example: "9034gqngr",
    description: "The password of the driver",
  })
  @IsOptional()
  @IsStrongPassword({ minLength: 5 })
  password?: string;

  @ApiProperty({
    example: 1000.5,
    description: "The total balance of the driver",
  })
  total_balance?: number;
}
