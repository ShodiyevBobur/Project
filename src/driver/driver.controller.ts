import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Put,
} from "@nestjs/common";
import { DriverService } from "./driver.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Driver } from "./entities/driver.entity";
import { LoginDriverDto } from "./dto/login-driver.dto";
import { Response } from "express";
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";

@ApiTags("driver")
@Controller("driver")
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post("register")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photo", maxCount: 1 },
      { name: "prava", maxCount: 1 },
    ])
  )
  @ApiOperation({ summary: "Register a new driver" })
  @ApiResponse({
    status: 201,
    description: "Driver registered successfully",
    type: Driver,
  })
  create(
    @Body() createDriverDto: CreateDriverDto,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; prava?: Express.Multer.File[] }
  ) {
    const photo = files.photo?.[0];
    const prava = files.prava?.[0];
    return this.driverService.register(createDriverDto, photo, prava);
  }

  @Post("login")
  @ApiOperation({ summary: "Login a driver" })
  @ApiResponse({
    status: 200,
    description: "Driver logged in successfully",
  })
  login(
    @Body() loginDriverDto: LoginDriverDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.driverService.login(loginDriverDto, res);
  }

  @Get()
  @ApiOperation({ summary: "Get all drivers" })
  @ApiResponse({
    status: 200,
    description: "Return all drivers",
    type: [Driver],
  })
  getAllDrivers(
    @Query("name") name?: string,
    @Query("surname") surname?: string,
    @Query("phone") phone?: string
  ) {
    return this.driverService.findAll({ name, surname, phone });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a driver by ID" })
  @ApiResponse({
    status: 200,
    description: "Return a driver by ID",
    type: Driver,
  })
  findOne(@Param("id") id: string) {
    return this.driverService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a driver" })
  @ApiResponse({
    status: 200,
    description: "Driver updated successfully",
    type: Driver,
  })
  update(@Param("id") id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a driver" })
  @ApiResponse({
    status: 200,
    description: "Driver deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.driverService.remove(+id);
  }
}
