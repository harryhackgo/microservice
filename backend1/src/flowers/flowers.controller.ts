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
import { FlowersService } from "./flowers.service";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { ClientProxy } from "@nestjs/microservices";

@Controller("flowers")
export class FlowersController {
  constructor(
    private readonly flowersService: FlowersService,
    @Inject("FLOWERS_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createFlowerDto: CreateFlowerDto) {
    const flower = await this.flowersService.create(createFlowerDto);
    this.clientService.emit("new_flower_created", flower);
    return flower;
  }

  @Post("order/:id")
  async orderFlower(@Param() id: string) {
    return this.flowersService.orderFlower(+id);
  }

  @Get()
  findAll() {
    this.clientService
      .emit("hello", "Hello from another server")
      .subscribe((data) => {
        console.log(data);
      });
    this.clientService
      .send("hi", "Hi from another server")
      .subscribe((data) => {
        console.log(data);
      });
    return this.flowersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.flowersService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateFlowerDto: UpdateFlowerDto
  ) {
    await this.flowersService.update(+id, updateFlowerDto);
    const flower = await this.flowersService.findOne(+id);
    this.clientService.emit("flower_updated", flower);
    return flower;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.flowersService.remove(+id);
    this.clientService.emit("flower_deleted", id);
    return id;
  }
}
