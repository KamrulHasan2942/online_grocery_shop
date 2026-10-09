import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Rider } from './rider.entity';
import { Order } from './order.entity';

@Injectable()
export class RiderService {

  constructor(
    @InjectRepository(Rider)
    private riderRepo: Repository<Rider>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  // CREATE RIDER
  async create(data: any) {

    // CHECK EXISTING EMAIL
    const existingRider =
      await this.riderRepo.findOne({
        where: {
          email: data.email,
        },
      });

    if (existingRider) {

      return {
        message: 'Email already exists',
      };
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10,
      );

    // CREATE RIDER
    const newRider =
      this.riderRepo.create({
        ...data,
        password: hashedPassword,
      });

    // SAVE RIDER
    const savedRider =
      await this.riderRepo.save(
        newRider,
      );

    // REMOVE PASSWORD
    const { password, ...result } =
      savedRider as any;

    return result;
  }

  // GET ALL RIDERS
  async findAll() {

    const riders =
      await this.riderRepo.find({
        relations: ['orders'],
      });

    return riders.map((rider) => {

      const { password, ...rest } =
        rider as any;

      return rest;
    });
  }

  // UPDATE RIDER NAME
  async updateName(
    id: number,
    name: string,
  ) {

    const rider =
      await this.riderRepo.findOneBy({
        id,
      });

    if (!rider) {

      return {
        message: 'Rider not found',
      };
    }

    rider.name = name;

    await this.riderRepo.save(rider);

    return {
      message: 'Name Updated',
      rider,
    };
  }

  // DELETE RIDER
  async delete(id: number) {

    const rider =
      await this.riderRepo.findOne({
        where: { id },
      });

    if (!rider) {

      return {
        message: 'Rider not found',
      };
    }

    await this.riderRepo.delete(id);

    return {
      message:
        'Rider Deleted Successfully',
    };
  }

  // CREATE ORDER
  async createOrder(
    riderId: number,
    data: any,
  ) {

    const rider =
      await this.riderRepo.findOne({
        where: {
          id: riderId,
        },
      });

    if (!rider) {

      return {
        message: 'Rider not found',
      };
    }

    const order =
      this.orderRepo.create({

        customerName:
          data.customerName,

        product:
          data.product,

        quantity:
          data.quantity,

        price:
          data.price,

        deliveryAddress:
          data.deliveryAddress,

        status:
          data.status || 'Pending',

        rider,
      });

    const savedOrder =
      await this.orderRepo.save(
        order,
      );

    return {

      message:
        'Order Created Successfully',

      order: savedOrder,
    };
  }

  // GET ALL PENDING JOBS
  async getPendingJobs() {

    return this.orderRepo.find({
      relations: ['rider'],
    });
  }

  // ACCEPT JOB
  async acceptJob(id: number) {

    const order =
      await this.orderRepo.findOne({
        where: { id },
      });

    if (!order) {

      return {
        message: 'Order not found',
      };
    }

    order.status = 'Accepted';

    await this.orderRepo.save(order);

    return {

      message: 'Job Accepted',

      order,
    };
  }

  // GET ORDERS BY RIDER ID
  async getOrderDetails(
    id: number,
  ) {

    const orders =
      await this.orderRepo.find({

        where: {
          rider: {
            id,
          },
        },

        relations: ['rider'],
      });

    return orders;
  }

  // GET SINGLE ORDER BY ORDER ID
  async getSingleOrder(
    id: number,
  ) {

    const order =
      await this.orderRepo.findOne({

        where: {
          id,
        },

        relations: ['rider'],
      });

    if (!order) {

      return {
        message: 'Order not found',
      };
    }

    return order;
  }

  // UPDATE STATUS
  async updateStatus(
    id: number,
    status: string,
  ) {

    const order =
      await this.orderRepo.findOne({
        where: { id },
      });

    if (!order) {

      return {
        message: 'Order not found',
      };
    }

    order.status = status;

    await this.orderRepo.save(order);

    return {

      message:
        'Status Updated',

      order,
    };
  }

  // CONFIRM DELIVERY
  async confirmDelivery(
    id: number,
  ) {

    const order =
      await this.orderRepo.findOne({
        where: { id },
      });

    if (!order) {

      return {
        message: 'Order not found',
      };
    }

    order.status = 'Delivered';

    await this.orderRepo.save(order);

    return {

      message:
        'Delivery Confirmed',

      order,
    };
  }

  // GET EARNINGS
  async getEarnings() {

    const orders =
      await this.orderRepo.find();

    const total =
      orders.reduce(

        (sum, order) =>

          sum +
          Number(order.price || 0),

        0,
      );

    return {

      totalEarnings: total,
    };
  }

  // ORDER HISTORY
  async getHistory() {

    return this.orderRepo.find({
      relations: ['rider'],
    });
  }

  // CANCEL JOB
  async cancelJob(
    id: number,
  ) {

    const order =
      await this.orderRepo.findOne({
        where: { id },
      });

    if (!order) {

      return {
        message: 'Job not found',
      };
    }

    await this.orderRepo.delete(id);

    return {
      message: 'Job Cancelled',
    };
  }
}