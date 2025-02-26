import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Flower } from "./entities/flower.entity";
import { Repository } from "typeorm";

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower) private flowerRepo: Repository<Flower>
  ) {}

  create(createFlowerDto: CreateFlowerDto) {
    return this.flowerRepo.save(createFlowerDto);
  }

  async orderFlower(id: number) {
    let flower = await this.flowerRepo.findOneBy({ id });
    if (!flower)
      throw new NotFoundException("Flower of this type was not found");
    flower.order = +1;
    this.flowerRepo.update({ id }, { order: flower.order });

    return flower;
  }

  findAll() {
    return this.flowerRepo.find();
  }

  findOne(id: number) {
    return this.flowerRepo.findOneBy({ id });
  }

  update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return this.flowerRepo.update({ id }, updateFlowerDto);
  }

  remove(id: number) {
    return this.flowerRepo.delete({ id });
  }
}
