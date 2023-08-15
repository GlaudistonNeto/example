import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { publishUserCreatedMessage, publishUserUpdatedMessage } from "./rabbitmq";

export class User {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  name: string;

  @prop()
  email: string;

  @prop({ default: false })
  completed: boolean;

  @prop({ default: () => new Date() })
  createdAt: Date;

  async saveWithRabbitMQ() {
    await this.save(); // Save user to the database

    // Publish RabbitMQ message when a new user is created
    await publishUserCreatedMessage(this._id);
  }
  save() {
    throw new Error("Method not implemented.");
  }

  async updateWithRabbitMQ() {
    await this.save(); // Update user in the database

    // Publish RabbitMQ message when a user is updated
    await publishUserUpdatedMessage(this._id);
  }
}
