import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './models/district.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([District]), JwtModule.register({})],

  controllers: [DistrictsController],
  providers: [DistrictsService],
})
export class DistrictsModule {}
