import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { RiderService } from './rider.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RiderDto } from './dto/rider.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('rider')
export class RiderController {

  constructor(
    private readonly riderService: RiderService,
  ) {}

  // CREATE RIDER
  @Post('create')
  createRider(
    @Body() data: RiderDto,
  ) {

    return this.riderService.create(
      data,
    );
  }

  // GET ALL RIDERS
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {

    return this.riderService.findAll();
  }

  // CREATE ORDER
  @Post('create-order/:riderId')
  createOrder(
    @Param('riderId') riderId: string,
    @Body() data: any,
  ) {

    return this.riderService.createOrder(
      Number(riderId),
      data,
    );
  }

  // GET PENDING JOBS
  @Get('pending-jobs')
  getPendingJobs() {

    return this.riderService.getPendingJobs();
  }

  // UPDATE RIDER NAME
  @Patch('name/:id')
  updateName(
    @Param('id') id: string,
    @Body() body: { name: string },
  ) {

    return this.riderService.updateName(
      Number(id),
      body.name,
    );
  }

  // ACCEPT JOB
  @Patch('accept/:id')
  acceptJob(
    @Param('id') id: string,
  ) {

    return this.riderService.acceptJob(
      Number(id),
    );
  }

  // GET ORDER DETAILS BY RIDER ID
  @Get('order-details/:id')
  getOrderDetails(
    @Param('id') id: string,
  ) {

    return this.riderService.getOrderDetails(
      Number(id),
    );
  }

  // GET SINGLE ORDER BY ORDER ID
  @Get('single-order/:id')
  getSingleOrder(
    @Param('id') id: string,
  ) {

    return this.riderService.getSingleOrder(
      Number(id),
    );
  }

  // UPDATE STATUS
  @Patch('status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateStatusDto,
  ) {

    return this.riderService.updateStatus(
      Number(id),
      statusDto.status,
    );
  }

  // CONFIRM DELIVERY
  @Post('delivered/:id')
  confirmDelivery(
    @Param('id') id: string,
  ) {

    return this.riderService.confirmDelivery(
      Number(id),
    );
  }

  // GET EARNINGS
  @Get('earnings')
  getEarnings() {

    return this.riderService.getEarnings();
  }

  // GET HISTORY
  @Get('history')
  getHistory() {

    return this.riderService.getHistory();
  }

  // CANCEL JOB
  @Delete('cancel-job/:id')
  cancelJob(
    @Param('id') id: string,
  ) {

    return this.riderService.cancelJob(
      Number(id),
    );
  }

  // DELETE RIDER
  // MUST BE LAST
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {

    return this.riderService.delete(
      Number(id),
    );
  }
}