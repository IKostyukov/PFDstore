import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }

  @Get()
  public async findAll() {
    try {
      return await this.userService.findAll();
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  @Post('pdf')
  public async addPdfToUser(@Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.findOneByEmail(updateUserDto.email);
      await this.userService.getUserImage(user.image);
      await this.userService.createPdf(user.firstName, user.lastName, user.image);
      await this.userService.savePdf(user);

      return { result: true };
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
}
