import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "./schemas/customer.schema";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly costomerModel: Model<Customer>
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.costomerModel.create(createCustomerDto);
  }

  findAll() {
    return this.costomerModel.find();
  }

  findOne(id: number) {
    return this.costomerModel.findOne({ id });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.costomerModel.findOneAndUpdate({ id }, updateCustomerDto);
  }

  remove(id: number) {
    return this.costomerModel.deleteOne({ id });
  }
}
