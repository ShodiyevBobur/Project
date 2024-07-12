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
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { Driver } from "./entities/driver.entity";
import { LoginDriverDto } from "./dto/login-driver.dto";
import { Response } from "express";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { SummaDto } from "./dto/summa-driver.dto";

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
  @ApiOperation({ summary: "Register a new driver with photo and prava files" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({
    status: 201,
    description: "Driver registered successfully",
    type: Driver,
  })
  create(
    @Body() createDriverDto: CreateDriverDto,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; prava?: Express.Multer.File[] },
    @Res({ passthrough: true }) res: Response
  ) {
    const photo = files.photo?.[0];
    const prava = files.prava?.[0];
    return this.driverService.register(createDriverDto, photo, prava, res);
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

  @Post("activate/:id")
  @ApiOperation({ summary: "Activate a driver" })
  @ApiParam({ name: "id", description: "Driver ID" })
  @ApiResponse({
    status: 200,
    description: "Driver activated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Driver not found",
  })
  active(@Param("id") id: string) {
    return this.driverService.activeDriver(+id);
  }

  @Put("unactivate/:id")
  @ApiOperation({ summary: "Deactivate a driver" })
  @ApiParam({ name: "id", description: "Driver ID" })
  @ApiResponse({
    status: 200,
    description: "Driver deactivated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Driver not found",
  })
  unactive(@Param("id") id: string) {
    return this.driverService.unactiveDriver(+id);
  }

  @Post("balance/:id")
  @ApiOperation({ summary: "Add balance to a driver's account" })
  @ApiParam({ name: "id", description: "Driver ID" })
  @ApiResponse({
    status: 200,
    description: "Balance added successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Driver not found",
  })
  addBalance(@Param("id") id: string, @Body() summaDto: SummaDto) {
    return this.driverService.addMoney(+id, summaDto);
  }

  @Delete("balance/:id")
  @ApiOperation({ summary: "Remove balance from a driver's account" })
  @ApiParam({ name: "id", description: "Driver ID" })
  @ApiResponse({
    status: 200,
    description: "Balance removed successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Driver not found",
  })
  removeBalance(@Param("id") id: string, @Body() summaDto: SummaDto) {
    return this.driverService.removeMoney(+id, summaDto);
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

  @Get("unactives")
  @ApiOperation({ summary: "Get all unactive drivers" })
  @ApiResponse({
    status: 200,
    description: "Return all unactive drivers",
    type: [Driver],
  })
  getUnActiveDriver() {
    return this.driverService.getUADrivers();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a driver by ID" })
  @ApiParam({ name: "id", description: "Driver ID" })
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
  @ApiParam({ name: "id", description: "Driver ID" })
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
  @ApiParam({ name: "id", description: "Driver ID" })
  @ApiResponse({
    status: 200,
    description: "Driver deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.driverService.remove(+id);
  }
}
