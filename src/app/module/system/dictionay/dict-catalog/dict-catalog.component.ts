import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DictService} from '../../../../shared/service/dict.service';
import {NzMessageService} from 'ng-zorro-antd';
import {DictCatalog} from '../../../../shared/entity/DictCatalog';

@Component({
  selector: 'app-dict-catalog',
  templateUrl: './dict-catalog.component.html',
  styleUrls: ['./dict-catalog.component.less']
})
export class DictCatalogComponent implements OnInit {

  // 表格所需数据
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet: Array<DictCatalog> = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  // 搜索表单
  searchModelForm: FormGroup = this.fb.group({
    dictKey: [null],
    dictValue: [null],
    dataSources: [null]
  });

  // 新增或者更新数据
  validateForm: FormGroup;
  dictCatalog: DictCatalog = new DictCatalog();

  // 抽屉显示
  visible = false;

  open(): void {

    this.visible = true;
  }

  close(reset: boolean): void {
    if (reset) {
      this.validateForm.reset();
      this.validateForm.get('dataSources').setValue('1');
    }
    this.visible = false;
  }

  // 表单搜索函数
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.dictService.getListCatalog(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchModelForm.value)
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
      this.dictService.saveCatalog(this.validateForm.value).subscribe((result: any) => {
        this.loading = false;
        if (result.status === '200') {
          this.message.success('添加成功');
          this.close(true);
        } else {
          this.message.success(result.msg);
        }
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
    this.dictCatalog = this.dataSet[findIndex];
    this.validateForm.patchValue(this.dictCatalog);
    this.open();
  }

  // 提交更新表单
  updateRowSubmit() {
    this.dictService.updateCatalog(this.validateForm.value).subscribe((result: any) => {
      if (result.status === '200') {
        // 删除数据
        this.dataSet = this.dataSet.filter(d => d.id !== this.dictCatalog.id);
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
    this.dictService.deleteCatalogById(id).subscribe((result: any) => {
      if (result.status === '200') {
        // 删除数据
        this.dataSet = this.dataSet.filter(d => d.id !== id);
        this.message.success(result.msg);
      } else {
        this.message.error(result.msg);
      }
    });
  }

  constructor(private fb: FormBuilder, private dictService: DictService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.searchData();
    this.validateForm = this.fb.group({
      id: [null],
      dictKey: [null, [Validators.required]],
      dictValue: [null, [Validators.required]],
      dataSources: ['1', Validators.required],
      execSql: [null],
      showOrder: ['100'],
      createTime: [null]
    });
  }

}
