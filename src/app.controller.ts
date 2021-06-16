import { Controller, Get, Param, Post, RequestMapping, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {

  SERVER_URL:  string  =  "http://localhost:3000/";


  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/upload-profile")
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: 'files',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadedFile(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
  }


 @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'files'});
  }

  uploadFile(@UploadedFile() file: Express.Multer.File,@Res() res ){

      res.sendFile
    
  }

  /**
   * uplooading multiple files
   */
  @Post("/upload-multiple-files")

  @UseInterceptors(FilesInterceptor("files"))

  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>){

    console.log("Uploaded files: ",files);
    
  }

  /**
   * uploading multiple fils with multiple files
   */

  @Post("/uploaded-multiple-file-different-fields")

  @UseInterceptors(FileFieldsInterceptor([
    {name: 'avatar',maxCount: 1},
    {name: 'background',maxCount: 1}
  ]))

  uploadFileDifferentField(@UploadedFiles() files){

  }

}
