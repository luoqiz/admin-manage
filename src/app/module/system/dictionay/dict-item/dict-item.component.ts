import {Component, OnInit, ViewChild} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService} from 'ng-zorro-antd';
import {DictItem} from '../../../../shared/entity/DictItem';
import {DictService} from '../../../../shared/service/dict.service';

@Component({
  selector: 'app-dict-item',
  templateUrl: './dict-item.component.html',
  styleUrls: ['./dict-item.component.less']
})
export class DictItemComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet: Array<DictItem> = [];
  loading = true;
  sortValue = null;
  sortKey = null;

  @ViewChild('treeCom') treeCom;
  searchValue = 's';
  // 编辑行
  editCache = {};
  // 当前选中节点
  currentNodeEvent: NzFormatEmitEvent;

  // 左侧树结构顶级数据
  topNodes = [];

  // 右侧列表显示子节点
  listChild(event: NzFormatEmitEvent): void {
    const searchModel: DictItem = new DictItem();
    this.currentNodeEvent = event;
    if (event.node.level === 0) {
      searchModel.catalogKey = event.node.key;
      searchModel.parentKey = event.node['parentKey'];
    } else {
      searchModel.catalogKey = event.node['catalogKey'];
      searchModel.parentKey = event.node.key;
    }
    this.dictService.getListItemByCondition(this.pageIndex, this.pageSize, null, null, searchModel)
      .subscribe((result: any) => {
        this.loading = false;
        if (result.status === '200') {
          this.dataSet = result.results.data;
          this.updateEditCache();
        } else {
          this.message.error(result.msg);
        }
      });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event, this.treeCom.getMatchedNodeList().map(v => v.title));
  }

  reloadChild(event: NzFormatEmitEvent) {
    const searchModel: DictItem = new DictItem();
    this.currentNodeEvent = event;
    if (event.node.level === 0) {
      searchModel.catalogKey = event.node.key;
      searchModel.parentKey = event.node['parentKey'];
    } else {
      searchModel.catalogKey = event.node['catalogKey'];
      searchModel.parentKey = event.node.key;
    }
    this.dictService.getListItemByCondition(this.pageIndex, this.pageSize, null, null, searchModel)
      .subscribe((result: any) => {
        this.loading = false;
        if (result.status !== '200') {
          this.message.error(result.msg);
        } else {
          event.node.clearChildren();
          const children = [];
          result.results.data.forEach((dictItem: DictItem) => {
            children.push({
              title: dictItem.itemValue,
              key: dictItem.itemKey,
              parentKey: dictItem.parentKey,
              catalogKey: dictItem.catalogKey
            });
          });
          event.node.addChildren(children);
        }
      });
  }

  // 异步加载子节点
  locadChild(event: NzFormatEmitEvent) {
    if (event.node.getChildren().length !== 0 || !event.node.isExpanded) {
      return;
    }
    this.reloadChild(event);
  }

  // 添加新的字典条目
  newDictItem() {
    // 选中节点在执行
    if (!this.currentNodeEvent) {
      this.message.warning('请先选择一个节点');
      return;
    }
    const dictItem: DictItem = new DictItem();
    console.log('等级', this.currentNodeEvent.node.level);
    dictItem.parentKey = this.currentNodeEvent.node.key;
    dictItem.id = '1';
    dictItem.itemKey = '';
    dictItem.itemValue = '';

    dictItem.showOrder = 100;
    this.dataSet = [dictItem, ...this.dataSet];
    this.updateEditCache();
  }

  constructor(private message: NzMessageService, private dictService: DictService) {
  }

  ngOnInit() {
    this.searchTopNodes();
  }

  // 加载树结构顶级数据（字典纲领记录）
  searchTopNodes(): void {
    this.loading = true;
    this.dictService.getListCatalog(1, 100, null, null, null)
      .subscribe((result: any) => {
        this.loading = false;
        if (result.status === '200') {
          result.results.data.forEach((dictCatalog, index) => {
            this.topNodes = [...this.topNodes, {
              title: dictCatalog.dictValue,
              key: dictCatalog.dictKey,
              parentKey: null,
              catalogKey: dictCatalog.dictKey
            }];
          });
        } else {
          this.message.error(result.msg);
        }
      });
  }

  // 更新编辑数据缓存
  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.id]) {
        console.log(item.id);
        this.editCache[item.id] = {
          edit: false,
          data: {...item}
        };
      }
    });
  }

  // 开启编辑模式
  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  // 取消编辑
  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }

  // 保存编辑
  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.id === key);
    Object.assign(this.dataSet[index], this.editCache[key].data);
    if (key !== '1') {
      this.dictService.updateDictItem(this.editCache[key].data).subscribe((result: any) => {
        if (result.status === '200') {
          this.message.success('添加成功');
        } else {
          this.message.error(result.msg);
        }
      });
    } else {
      let tempNode = this.currentNodeEvent.node;
      while (!!tempNode.getParentNode()) {
        tempNode = tempNode.getParentNode();
      }
      this.editCache[key].data.catalogKey = tempNode.key;
      this.dictService.saveDictItem(this.editCache[key].data).subscribe((result: any) => {
        if (result.status === '200') {
          this.message.success(result.msg);
          this.listChild(this.currentNodeEvent);
        } else {
          this.message.error(result.msg);
        }
      });
    }
    this.editCache[key].edit = false;
  }

  deleteItem(id: string) {
    this.dictService.deleteItemById(id).subscribe((result: any) => {
      if (result.status === '200') {
        this.message.success(result.msg);
        this.listChild(this.currentNodeEvent);
      } else {
        this.message.error(result.msg);
      }
    });
  }

}
