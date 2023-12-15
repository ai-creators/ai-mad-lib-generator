import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { CreateAdlibDto } from './dto/create-adlib.dto';
import { UpdateAdlibDto } from './dto/update-adlib.dto';

@Controller('adlib')
export class AdlibController {
  constructor(private readonly adlibService: AdlibService) {}

  @Post()
  create(@Body() createAdlibDto: CreateAdlibDto) {
    return this.adlibService.create(createAdlibDto);
  }

  @Get()
  findAll() {
    return this.adlibService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adlibService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdlibDto: UpdateAdlibDto) {
    return this.adlibService.update(+id, updateAdlibDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adlibService.remove(+id);
  }
}
