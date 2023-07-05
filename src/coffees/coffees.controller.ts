import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) { }
  @Get()
  @HttpCode(301)
  findAll(@Query() query: PaginationQueryDto) {
    // const { limit, offset } = query;
    // return `this will return all coffees Limit:${limit} and Offset:${offset}`;
    return this.coffeesService.findall(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // return `this will return ${id} coffees`;
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `this will return update ${id}`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // return `this will return delete ${id}`;
    this.coffeesService.remove(id);
  }
}
