import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";
import { ReceiveFileDto } from './dto/receive-file.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('FILEPROCESSOR') private readonly clientFileProcessor: ClientProxy
  ) {}

  loadFile(receiveFileDto: ReceiveFileDto) {
    const startTs = Date.now();
    const pattern = { cmd: 'loadFile'};
    const payload = receiveFileDto;
    return this.clientFileProcessor
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }
}