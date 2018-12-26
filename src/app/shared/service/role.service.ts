import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Role} from '../entity/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  /**
   * 添加角色记录
   * @param dictCatalog
   */
  saveCatalog(role: Role): Observable<{}> {
    const urlPath = '/role/save';
    return this.http.post(urlPath, role);
  }

  /**
   * 分页获取角色记录
   * @param pageIndex
   * @param pageSize
   * @param sortField
   * @param sortOrder
   * @param searchModel
   */
  getListRole(pageIndex: number, pageSize: number, sortField: string, sortOrder: string, searchModel: JSON): Observable<{}> {
    const urlPath = '/role/list';
    let params = new HttpParams()
      .append('pageIndex', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    console.log(searchModel);
    for (let name in searchModel) {
      if (!!searchModel[name]) {
        params = params.append(name, searchModel[name]);
      }
    }
    return this.http.get(urlPath, {
      params
    });
  }

  /**
   * 更新角色记录
   * @param role
   */
  updateCatalog(role: Role): Observable<{}> {
    const urlPath = '/role/';
    return this.http.patch(urlPath, role);
  }

  /**
   * 删除角色记录
   * @param id
   */
  deleteCatalogById(id: string) {
    const urlPath = '/role/' + id;
    return this.http.delete(urlPath);
  }
}
