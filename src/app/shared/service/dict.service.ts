import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DictItem} from '../entity/DictItem';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DictCatalog} from '../entity/DictCatalog';

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(private http: HttpClient) {
  }

  /**
   * 添加字典纲领记录
   * @param dictCatalog
   */
  saveCatalog(dictCatalog: DictCatalog): Observable<{}> {
    const urlPath = '/dict/catalog/save';
    return this.http.post(urlPath, dictCatalog);
  }

  /**
   * 分页获取字典纲领记录
   * @param pageIndex
   * @param pageSize
   * @param sortField
   * @param sortOrder
   * @param searchModel
   */
  getListCatalog(pageIndex: number, pageSize: number, sortField: string, sortOrder: string, searchModel: JSON): Observable<{}> {
    const urlPath = '/dict/catalog/list';
    let params = new HttpParams()
      .append('pageIndex', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    if (!!searchModel) {
      for (let name in searchModel) {
        if (!!searchModel[name]) {
          params = params.append(name, searchModel[name]);
        }
      }
    }
    return this.http.get(urlPath, {
      params
    });
  }

  /**
   * 更新字典纲领记录
   * @param dictCatalog
   */
  updateCatalog(dictCatalog: DictCatalog): Observable<{}> {
    const urlPath = '/dict/catalog/';
    return this.http.patch(urlPath, dictCatalog);
  }

  /**
   * 删除字典纲领记录
   * @param id
   */
  deleteCatalogById(id: string) {
    const urlPath = '/dict/catalog/' + id;
    return this.http.delete(urlPath);
  }

  /**
   * 获取字典条目记录
   * @param id
   */
  getListItemByCondition(pageIndex: number, pageSize: number, sortField: string, sortOrder: string, searchModel: DictItem) {
    const urlPath = '/dict/item/list';
    let params = new HttpParams()
      .append('pageIndex', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    if (!!searchModel) {
      for (let name in searchModel) {
        if (!!searchModel[name]) {
          params = params.append(name, searchModel[name]);
        }
      }
    }
    return this.http.get(urlPath, {
      params
    });
  }

  /**
   * 添加字典条目记录
   * @param dictCatalog
   */
  saveDictItem(dictItem: DictItem): Observable<{}> {
    if (!!dictItem.id) {
      dictItem.id = null;
    }
    const urlPath = '/dict/item/save';
    return this.http.post(urlPath, dictItem);
  }

  /**
   * 更新字典纲领记录
   * @param dictItem
   */
  updateDictItem(dictItem: DictItem): Observable<{}> {
    const urlPath = '/dict/item/';
    return this.http.patch(urlPath, dictItem);
  }

  /**
   * 删除字典条目记录
   * @param id
   */
  deleteItemById(id: string) {
    const urlPath = '/dict/item/' + id;
    return this.http.delete(urlPath);
  }
}
