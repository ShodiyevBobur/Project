import { IsNotEmpty, IsString, IsInt } from "class-validator";
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

  @ApiProperty({
    description: "The ID of the district where the taxi ride starts",
  })
  @IsInt()
  @IsNotEmpty()
  from_district_id: number;

  @ApiProperty({
    description: "The ID of the district where the taxi ride ends",
  })
  @IsInt()
  @IsNotEmpty()
  to_district_id: number;

  @ApiProperty({ description: "The user ID associated with the taxi order" })
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
