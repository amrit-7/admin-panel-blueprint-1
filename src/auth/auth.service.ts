import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from "bcryptjs";
@Injectable()
export class AuthService {
    constructor(private adminService: AdminService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminService.findOne(username);
    const passwordValid = await bcrypt.compare(password, user.password)
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
