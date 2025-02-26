import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from "@nestjs/common";
import { ShopsService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { ClientProxy } from "@nestjs/microservices";
import { UpdateShopDto } from "./dto/update-shop.dto";

@Controller("shops")
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    @Inject("FLOWERS_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    const shop = await this.shopsService.create(createShopDto);
    this.clientService.emit("new_shop_created", shop);
    return shop;
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.shopsService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateShopDto: UpdateShopDto) {
    await this.shopsService.update(+id, updateShopDto);
    const shop = await this.shopsService.findOne(+id);
    this.clientService.emit("shop_updated", shop);
    return shop;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.shopsService.remove(+id);
    this.clientService.emit("shop_deleted", id);
    return id;
  }
}
