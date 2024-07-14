import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  getUsers() {
    return this.userModel.find().populate('settings posts');
  }

  // createUser(createUserDto: CreateUserDto) {
  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newUserSettings = new this.userSettingsModel(settings);
      const saveNewUserSettings = await newUserSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: saveNewUserSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    //? id and updateUserDto are required, the { new: true } means it will return the new document
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
