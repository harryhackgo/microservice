import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type FlowerDocument = HydratedDocument<Flower>;

@Schema()
export class Flower {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  order: number;
}

export const FlowerSchema = SchemaFactory.createForClass(Flower);
