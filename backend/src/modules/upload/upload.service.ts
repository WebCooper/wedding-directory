import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },

      // IMPORTANT for MinIO
      endpoint: 'https://minio.internalbuildtools.online',
      forcePathStyle: true,
    });
  }

  async uploadImage(fileName: string, fileBuffer: Buffer) {
    const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg', // Or dynamic based on file
    };

    await this.s3Client.send(new PutObjectCommand(params));

    // PUBLIC URL USING MINIO FORMAT
    return `https://minio.internalbuildtools.online/${bucket}/${fileName}`;
  }

  async uploadVideo(fileName: string, fileBuffer: Buffer) {
    const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'video/mp4',
    };

    await this.s3Client.send(new PutObjectCommand(params));

    return `https://minio.internalbuildtools.online/${bucket}/${fileName}`;
  }
}
