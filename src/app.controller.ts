import { Controller, Get, Post, Body, UseFilters } from "@nestjs/common";
import { AppService } from "./app.service";
import { ReceiveFileDto } from './dto/receive-file.dto';
import { AllExceptionsFilter } from "./filters/http-exception.filter";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Post('file')
    @UseFilters(AllExceptionsFilter)
    async loadFile(
      @Body() receiveFileDto: ReceiveFileDto ){
     const getFile:any = await this.appService.loadFile(receiveFileDto);
       return getFile;
    }
}
