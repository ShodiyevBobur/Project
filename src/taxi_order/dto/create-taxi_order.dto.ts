import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaxiOrderDto {
  @ApiProperty({ description: "The date of the taxi order" })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: "The description of the taxi order" })
  @IsString()
  description: string;

  @ApiProperty({ description: "The start location of the taxi order" })
  @IsString()
  @IsNotEmpty()
  location_start: string;
}
