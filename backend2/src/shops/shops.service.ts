import { Injectable } from "@nestjs/common";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { Shop } from "./schemas/shop.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<Shop>
  ) {}

  create(createShopDto: CreateShopDto) {
    return this.shopModel.create(createShopDto);
  }

  findAll() {
    return this.shopModel.find();
  }

  findOne(id: number) {
    return this.shopModel.findOne({ id });
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return this.shopModel.findOneAndUpdate({ id }, updateShopDto);
  }

  remove(id: number) {
    return this.shopModel.findOneAndDelete({ id });
  }
}
