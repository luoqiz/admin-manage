import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Role} from '../entity/Role';
import {Observable} from 'rxjs';
import {SystemUser} from '../entity/SystemUser';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {

  constructor(private http: HttpClient) {
  }

  /**
   * 添加记录
   * @param systemUser
   */
  saveRecord(systemUser: SystemUser): Observable<{}> {
    const urlPath = '/user/save';
    return this.http.post(urlPath, systemUser);
  }

  /**
   * 分页获取用户记录
   * @param pageIndex
   * @param pageSize
   * @param sortField
   * @param sortOrder
   * @param searchModel
   */
  getListRole(pageIndex: number, pageSize: number, sortField: string, sortOrder: string, searchModel: JSON): Observable<{}> {
    const urlPath = '/user/list';
    let params = new HttpParams()
      .append('pageIndex', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    for (let name in searchModel) {
      if (searchModel[name] != null) {
        params = params.append(name, searchModel[name]);
      }
    }
    return this.http.get(urlPath, {
      params
    });
  }

  /**
   * 更新用户记录
   * @param systemUser
   */
  updateRecord(systemUser: SystemUser): Observable<{}> {
    const urlPath = '/user/';
    return this.http.patch(urlPath, systemUser);
  }

  /**
   * 删除记录
   * @param id
   */
  deleteById(id: string) {
    const urlPath = '/user/' + id;
    return this.http.delete(urlPath);
  }

  /**
   * 获取角色记录
   * @param userId
   */
  listRoleByUserId(userId: string) {
    const urlPath = '/user/role/' + userId;
    return this.http.get(urlPath);
  }


  /**
   * 获取角色信息
   * @param userRoleRe
   */
  updateRoleInfo(userRoleRe: string) {
    const urlPath = '/user/role';
    return this.http.put(urlPath, {userRoleRe});
  }
}
