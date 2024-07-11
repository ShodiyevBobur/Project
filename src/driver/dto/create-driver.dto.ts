import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { IsUzbekPassportNumber } from "../../decorators/validator/IsUzbekPassportNumber";

export class CreateDriverDto {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the driver",
  })
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
    example: "+123456789",
    description: "The phone number of the driver",
  })
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "A1234567",
    description: "The passport number of the driver",
  })
  @IsNotEmpty()
  @IsUzbekPassportNumber()
  passport: string;

  @ApiProperty({
    example: "Tashent",
    description: "where from",
  })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({
    example: "Samarkand",
    description: "where to",
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
    example: 1000.5,
    description: "The total balance of the driver",
  })
  total_balance: number;
  @ApiProperty({
    example: 130345,
    description: "The otp code of the driver",
  })
  otp_pass: string;
}
