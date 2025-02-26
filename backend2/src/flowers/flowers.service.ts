import { Injectable } from "@nestjs/common";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { Flower } from "./schemas/flower.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class FlowersService {
  constructor(
    @InjectModel(Flower.name) private readonly flowerModel: Model<Flower>
  ) {}

  create(createFlowerDto: CreateFlowerDto) {
    return this.flowerModel.create(createFlowerDto);
  }

  findAll() {
    return this.flowerModel.find();
  }

  findOne(id: number) {
    return this.flowerModel.findOne({ id });
  }

  update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return this.flowerModel.findOneAndUpdate({ id }, updateFlowerDto);
  }

  remove(id: number) {
    return this.flowerModel.findOneAndDelete({ id });
  }
}
