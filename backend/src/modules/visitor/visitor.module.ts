import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorService } from './visitor.service';
import { VisitorResolver } from 'src/graphql/resolvers/visitor.resolver';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { ChecklistModule } from '../checklist/checklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorEntity]),ChecklistModule],
  providers: [VisitorService, VisitorResolver],
  exports: [VisitorService],
})
export class VisitorModule {}
