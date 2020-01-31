import redis
import random
import hashlib


class CommonFunc(object):
    def random_str(self, num):
        H = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        salt = ''
        for i in range(num):
            salt += random.choice(H)

        return salt

    def md5_it(self, str):
        str_md5 = hashlib.md5(str.encode('utf-8')).hexdigest()
        return str_md5

    def dict_list_get_single_element(self, list, key, value, target_key, index=0):
        '''
            获取字典列表中第一个key==value的target_key的值，index的传入可以加速
        '''
        # 不知道index情况下遍历
        if index == 0:
            for single_element in list:
                if single_element[key] == value:
                    return single_element[target_key]
                else:
                    return None
        # 知道index情况下加速结果返回速度
        else:
            temp = True
            try:
                temp = list[index][key] == value
            except:
                temp = False
            if temp:
                return list[index][target_key]
            else:
                for single_element in list:
                    if single_element[key] == value:
                        return single_element[target_key]
                    else:
                        return None

    def dict_list_get_all_element(self, list, key, value, target_key):
        '''
            获取字典列表中第一个key==value的target_key的值，index的传入可以加速
        '''
        result = []
        for single_element in list:
            if single_element[key] == value:
                result.append(single_element[target_key])
            else:
                pass
        return result