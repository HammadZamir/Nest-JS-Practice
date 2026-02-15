import { Controller, Get } from '@nestjs/common';

@Controller('vouchers')
export class VouchersController {
    @Get("cats")
    findAll(): string {
        const vouchers = ['Voucher1', 'Voucher2', 'Voucher3'];
        return `The Vouchers are : ${vouchers}`;
    }
}
