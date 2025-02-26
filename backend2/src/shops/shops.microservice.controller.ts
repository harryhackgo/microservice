import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ShopsService } from "./shops.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller("shops")
export class ShopsMicroserviceController {
  constructor(private readonly shopsService: ShopsService) {}

  @EventPattern("new_shop_created")
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @EventPattern("shop_updated")
  update(@Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(updateShopDto.id!, updateShopDto);
  }

  @EventPattern("shop_deleted")
  async remove(id: string) {
    return this.shopsService.remove(+id);
  }
}
