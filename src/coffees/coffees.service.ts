import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { Coffee } from './entities/cofffee.entity';
import { Falvor } from './entities/falvor.entity';

@Injectable()
export class CoffeesService {
  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: 'Roast',
  //     brand: 'Dadu',
  //     flavors: ['chocolate', 'vanila'],
  //   },
  // ];
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Falvor)
    private readonly flavorRepository: Repository<Falvor>,
  ) { }

  findall(pgq: PaginationQueryDto) {
    const { limit, offset } = pgq;
    // return this.coffees;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    // const coffee = this.coffees.find((item) => item.id === +id);
    console.log(id);
    const coffee = await this.coffeeRepository.findOneBy({
      id: id,
    });
    if (coffee) {
      return coffee;
    }
    // throw new HttpException(`Coffee ${id} is not found`, 404);
  }

  async create(createCoffeeDto: any) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
    );
    // this.coffees.push(createCoffeeDto);
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    // return createCoffeeDto;
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: any) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new HttpException(`Coffee ${id} is not found`, 404);
    }
    return this.coffeeRepository.save(coffee);
    // const exit = this.findOne(id);
    // if (exit) {
    // }
  }

  async remove(id: number) {
    // const exit = this.coffees.findIndex((item) => item.id === +id);
    // if (exit >= 0) {
    //   this.coffees.splice(exit, 1);
    // }
    const coffee = await this.coffeeRepository.findOneBy({ id: id });
    return this.coffeeRepository.remove(coffee);
  }

  private async preLoadFlavorByName(name: string): Promise<Falvor> {
    const exFalvor = await this.flavorRepository.findOneBy({ name: name });
    if (exFalvor) {
      return exFalvor;
    }
    return this.flavorRepository.create({ name });
  }
}
