export class SystemUser {
  id: string; // 主键
  // 用户名
  username: string;
  // 头像
  avatar: string;
  // 手机号
  phone: string;
  // 邮箱
  email: string;
  // 所在省代码
  cityCode: string;
  // 密码
  password: string;
  // 昵称
  nickname: string;
  // 性别
  sex: string;
  // 出生日期
  birthday: Date;
  // 账号可用性
  enabled: boolean;
  // 凭证有效性
  credentials: boolean;
  // 账号未锁定性
  nonLocked: boolean;
  // 账号过期性
  nonExpired: boolean;
  // 账号过期时间
  expiredTime: Date;
  // 账号解锁时间
  unlockedTime: Date;
  // 最后一次登录时间
  lastTime: Date;
  // 注册时间
  createTime: Date;
  // 备注
  remarks: string;
}