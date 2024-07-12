import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { IsUzbekPassportNumber } from "../../decorators/validator/IsUzbekPassportNumber";

export class CreateDriverDto {
  @ApiProperty({ example: "John", description: "The first name of the driver" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "Doe", description: "The last name of the driver" })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ example: 30, description: "The age of the driver" })
  @IsNotEmpty()
  @IsNumberString()
  age: number;

  @ApiProperty({
    example: "+998912345678",
    description: "The phone number of the driver",
  })
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "AS1234567",
    description: "The passport number of the driver",
  })
  @IsNotEmpty()
  @IsUzbekPassportNumber()
  passport: string;

  @ApiProperty({
    example: "Tashkent",
    description: "The city where the driver is from",
  })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({
    example: "Samarkand",
    description: "The city where the driver is going to",
  })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({
    example: "9034gqngr",
    description: "The password of the driver",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 12345,
    description: "The OTP code of the driver",
  })
  @IsNumberString()
  otp_pass: number;

  @ApiProperty({ type: "string", format: "binary" })
  photo: any;

  @ApiProperty({ type: "string", format: "binary" })
  prava: any;
}
