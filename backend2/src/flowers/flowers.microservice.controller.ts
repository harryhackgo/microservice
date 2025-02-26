import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FlowersService } from "./flowers.service";
import { CreateFlowerDto } from "./dto/create-flower.dto";
import { UpdateFlowerDto } from "./dto/update-flower.dto";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

@Controller("flowers")
export class FlowersMicroserviceController {
  constructor(private readonly flowersService: FlowersService) {}

  @EventPattern("hello")
  async hello(data: string) {
    console.log(data);
    return "hello has been received";
  }

  @MessagePattern("hi")
  async hi(data: string) {
    console.log(data);
    return "hi has been received";
  }

  @EventPattern("new_flower_created")
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @EventPattern("flower_updated")
  update(@Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(updateFlowerDto.id!, updateFlowerDto);
  }

  @EventPattern("flower_deleted")
  async remove(id: string) {
    return this.flowersService.remove(+id);
  }
}
