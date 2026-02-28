import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  async create(userId: string, dto: CreateTaskDto) {
    return this.taskModel.create({
      ...dto,
      user: new Types.ObjectId(userId),
    });
  }

  async findAll(userId: string, status?: string, priority?: string) {
    const filter: any = { user: userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    return this.taskModel.find(filter).sort({ createdAt: -1 });
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskModel.findOne({
      _id: id,
      user: userId,
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, user: userId },
      dto,
      { new: true },
    );

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async remove(id: string, userId: string) {
    const task = await this.taskModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!task) throw new NotFoundException('Task not found');

    return { message: 'Task deleted successfully' };
  }
}