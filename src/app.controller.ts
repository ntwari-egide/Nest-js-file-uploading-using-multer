import { Controller, Get, Post, RequestMapping, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/upload-file")

  @UseInterceptors(FileInterceptor("file"))

  uploadFile(@UploadedFile() file: Express.Multer.File){

    console.log("File uploaded: ",file);
    
  }

  /**
   * uplooading multiple files
   */
  @Post("/upload-multiple-file")

  @UseInterceptors(FilesInterceptor("files"))

  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>){
    
    console.log("Uploaded files: ",files);
    
  }

}
