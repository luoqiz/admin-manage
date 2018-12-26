import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../shared/service/role.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Role} from '../../../shared/entity/Role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {

  // 表格所需数据
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet: Array<Role> = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  // 搜索表单
  searchModelForm: FormGroup = this.fb.group({
    roleCode: [null],
    roleName: [null],
    effective: [true]
  });

  // 新增或者更新数据
  validateForm: FormGroup;
  roleModel: Role = new Role();

  // 抽屉显示
  visible = false;

  open(reset: boolean): void {
    if (reset) {
      this.validateForm.reset();
      this.validateForm.get('effective').setValue(true);
    }
    this.visible = true;
  }

  close(reset: boolean): void {
    if (reset) {
      this.validateForm.reset();
      this.validateForm.get('effective').setValue(true);
    }
    this.visible = false;
  }

  // 表单搜索函数
  searchData(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.pageIndex = 1;
    }
    this.roleService.getListRole(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchModelForm.value)
      .subscribe((result: any) => {
      this.loading = false;
      if (result.status === '200') {
        this.total = result.results.total;
        this.dataSet = result.results.data;
      } else {
        this.total = 1;
        this.dataSet = [];
      }
    });
  }

  // 添加记录表单提交
  submitForm(): void {
    this.loading = true;
    if (this.validateForm.valid) {
      this.roleService.saveCatalog(this.validateForm.value).subscribe((result: any) => {
        this.loading = false;
        // if (result.status === 200) {
        //   this.message.success(result.msg);
        // }
        this.message.success(result.msg);
        this.close(true);
      }, error1 => {
        this.loading = false;
        this.message.error('程序出错，请联系管理员');
      });
    }
  }

// 搜索表单提交
  searchModelFormSubmit() {
    this.searchData(true);
  }

  // 将更新记录填入到修改表单中
  updateRow(id: string) {
    // 找寻数组对象中符合条件的对象并赋值给其他dictCatalog
    const findIndex = this.dataSet.findIndex(item => item.id.trim() === id.trim());
    this.roleModel = this.dataSet[findIndex];
    this.validateForm.patchValue(this.roleModel);
    this.open(false);
  }

  // 提交更新表单
  updateRowSubmit() {
    this.roleService.updateCatalog(this.validateForm.value).subscribe((result: any) => {
      if (result.status === '200') {
        // 删除数据
        this.dataSet = this.dataSet.filter(d => d.id !== this.roleModel.id);
        // 增加数据
        this.dataSet = [this.validateForm.value, ...this.dataSet];
        this.message.success(result.msg);
        this.close(true);
      } else {
        this.message.error(result.msg);
      }
    });

  }

  deleteRow(id: string) {
    this.roleService.deleteCatalogById(id).subscribe((result: any) => {
      if (result.status === '200') {
        // 删除数据
        this.dataSet = this.dataSet.filter(d => d.id !== id);
        this.message.success(result.msg);
      } else {
        this.message.error(result.msg);
      }
    });
  }

  constructor(private fb: FormBuilder, private roleService: RoleService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.searchData();
    this.validateForm = this.fb.group({
      id: [null],
      roleCode: [null, Validators.required],
      roleName: [null, Validators.required],
      effective: ['true'],
      remarks: [null]
    });
  }


}
