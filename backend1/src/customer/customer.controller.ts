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
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ClientProxy } from "@nestjs/microservices";

@Controller("customer")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    @Inject("FLOWERS_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = this.customerService.create(createCustomerDto);
    this.clientService.send("createCustomer", customer);
    return customer;
  }

  @Get()
  findAll() {
    this.clientService.send("findAllCustomer", {});
    return this.customerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    this.clientService.send("findOneCustomer", { id });
    return this.customerService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    const customer = this.customerService.update(+id, updateCustomerDto);
    this.clientService.send("updateCustomer", customer);
    return customer;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    const customer = this.customerService.remove(+id);
    this.clientService.send("removeCustomer", customer);
    return customer;
  }
}
