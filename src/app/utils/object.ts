import * as querystring from "querystring";
import { ObjectType } from '@app/types';

/**
 * @Author: 水痕
 * @Date: 2020-01-24 13:16:17
 * @LastEditors: 水痕
 * @Description: 将对象转换为字符串
 * eg.对象转换为name=hello&age=20
 * @param {type}
 * @return:
 */
export const object2str = (data: object): string => {
  return querystring.stringify(data);
}


/**
 * @Author: 水痕
 * @Date: 2020-01-24 19:38:49
 * @LastEditors: 水痕
 * @Description: 过滤对象中空的提交到后台
 * @param {type}
 * @return:
 */
export const fileObjectField = (data: object): object => {
  return Object.keys(data).reduce((cur, next) => {
    if (data[next] || /^\d+$/.test(data[next])) {
      cur[next] = data[next];
    }
    return cur;
  }, {});
}


/**
 * @Author: 水痕
 * @Date: 2020-01-27 09:47:14
 * @LastEditors: 水痕
 * @Description: 去除对象value的前后空格
 * @param {type}
 * @return:
 */
export const trimObject = (data: ObjectType): ObjectType => {
  return Object.keys(data).reduce((cur, next) => {
    cur[next] = data[next];
    return cur;
  }, {});
}


/**
 * @Author: 水痕
 * @Date: 2020-01-27 10:09:20
 * @LastEditors: 水痕
 * @Description: 对url地址的参数加以处理
 * @param {type}
 * @return:
 */
export const urlObjectParams = (data: ObjectType): string => {
  return object2str(fileObjectField(trimObject(data)));
}
