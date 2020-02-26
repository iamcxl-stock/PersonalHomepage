import time
import json
import redis
import datetime
import requests
import traceback
import configparser
from . import privilege
from functools import wraps
from flask_cors import cross_origin
from flask import session, redirect, url_for, current_app, flash, Response, request, jsonify, abort
from ..model.login_model import user
from ..model.privilege_model import role, privilege_role
from ..model.privilege_model import privilege as privilege_model
from ..common_func import CommonFunc
from .privilege_control import privilegeFunction
from ..privilege.privilege_control import user_list_get, role_list_get, privilege_list_get, privilege_role_list_get
from ..privilege.privilege_control import permission_required

URL_PREFIX = '/privilege'
cf = CommonFunc()
pf = privilegeFunction()


# 用户列表获取（带有用户的角色信息）
@privilege.route('/userGet', methods=['POST'])
@permission_required(URL_PREFIX + '/userGet')
@cross_origin()
def userGet():
    try:
        user_name = request.get_json()['user']
        result = []
        role_list = role_list_get()
        user_list = user_list_get()
        current_role_id = cf.dict_list_get_single_element(user_list, 'name', user_name, 'role_id')
        current_user_role = cf.dict_list_get_single_element(role_list, 'id', current_role_id, 'name', current_role_id - 1)
        if current_user_role == '管理员':
            for single_user in user_list:
                single_user['is_edit'] = 1
                single_user['role_name'] = cf.dict_list_get_single_element(role_list, 'id', single_user['role_id'], 'name', single_user['role_id'] - 1)
        else:
            for single_user in user_list:
                if single_user['name'] == user_name:
                    single_user['is_edit'] = 1
                else:
                    single_user['is_edit'] = 0
        return jsonify({'code': 200, 'msg': '成功！', 'data': user_list})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 用户禁用
@privilege.route('/userDisable', methods=['POST'])
@permission_required(URL_PREFIX + '/userDisable')
@cross_origin()
def userDisable():
    try:
        user_id = request.get_json()['user_id']
        user.update(is_valid=0, update_time=datetime.datetime.now()).where(user.id == user_id).execute()
        pf.del_user_id_to_redis(user_id)
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 用户启用
@privilege.route('/userEnable', methods=['POST'])
@permission_required(URL_PREFIX + '/userEnable')
@cross_origin()
def userEnable():
    try:
        user_id = request.get_json()['user_id']
        user.update(is_valid=1, update_time=datetime.datetime.now()).where(user.id == user_id).execute()
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 用户信息修改
@privilege.route('/userRoleChange', methods=['POST'])
@permission_required(URL_PREFIX + '/userRoleChange')
@cross_origin()
def userRoleChange():
    ALLOWED_TIME_SPAN = 100  # 盐过期X秒内允许修改，否则需要重新登录
    try:
        login_name = request.get_json()['login_name']
        user_query = user.select().where(user.login_name == login_name).dicts()
        if len(user_query) == 0:
            response = {
                'code': 403,
                'msg': '用户名或密码错误！',
            }
            return (False, response)
        else:
            for row in user_query:
                salt_expire_time = row['salt_expire_time']
                server_timestamp = int(time.mktime(datetime.datetime.now().timetuple()))
                if server_timestamp < salt_expire_time + ALLOWED_TIME_SPAN:
                    role_id = request.get_json()['role_id']
                    user.update(role_id=role_id, update_time=datetime.datetime.now()).where(user.login_name == login_name).execute()
                    response = {'code': 200, 'msg': '成功'}
                else:
                    response = {'code': 403, 'msg': '登录状态已过期，请返回并重新验证密码'}
        return jsonify(response)
    except Exception as e:
        response = {'code': 500, 'msg': e, 'data': {}}
        return jsonify(response), 500


# 用户删除
@privilege.route('/userDelete', methods=['POST'])
@permission_required(URL_PREFIX + '/userDelete')
@cross_origin()
def userDelete():
    try:
        user_id = request.get_json()['user_id']
        user_status = user.get(user.id == user_id).is_valid
        if user_status == 0:
            user.update(is_valid=-1, update_time=datetime.datetime.now()).where(user.id == user_id).execute()
            pf.del_user_id_to_redis(user_id)
            return jsonify({'code': 200, 'msg': '成功！'})
        else:
            return jsonify({'code': 500, 'msg': '失败！删除前请先禁用角色'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 角色列表获取
@privilege.route('/roleGet', methods=['GET'])
@permission_required(URL_PREFIX + '/roleGet')
@cross_origin()
def roleGet():
    try:
        return jsonify({'code': 200, 'msg': '成功！', 'data': role_list_get()})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 角色具有的权限列表获取
@privilege.route('/rolePrivilegeGet', methods=['POST'])
@permission_required(URL_PREFIX + '/rolePrivilegeGet')
@cross_origin()
def rolePrivilegeGet():
    try:
        role_id = request.get_json()['role_id']
        result = []
        privilege_list = privilege_list_get()
        privilege_role_query = privilege_role.select().where((privilege_role.role_id == role_id) & (privilege_role.is_valid == 1)).order_by(privilege_role.id).dicts()
        for row in privilege_role_query:
            result.append({
                'privilege_id': row['privilege_id'],
                'privilege_name': cf.dict_list_get_single_element(privilege_list, 'id', row['privilege_id'], 'name', row['privilege_id'] - 1),
            })
        return jsonify({'code': 200, 'msg': '成功！', 'data': result})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 角色对应权限修改
@privilege.route('/rolePrivilegeEdit', methods=['POST'])
@permission_required(URL_PREFIX + '/rolePrivilegeEdit')
@cross_origin()
def rolePrivilegeEdit():
    try:
        role_id = request.get_json()['role_id']
        checked_privilege_id = request.get_json()['checked_privilege_id']
        privilege_role.update(is_valid=0).where(privilege_role.role_id == role_id).execute()
        data_source = []
        for single_checked_privilege_id in checked_privilege_id:
            data_source.append((single_checked_privilege_id, role_id, 1))
        field = [privilege_role.privilege_id, privilege_role.role_id, privilege_role.is_valid]
        privilege_role.insert_many(data_source, field).execute()
        pf.flush_role_privilege_to_redis(role_id)
        response = {'code': 200, 'msg': '成功'}
        return jsonify(response)
    except Exception as e:
        response = {'code': 500, 'msg': e, 'data': {}}
        return jsonify(response), 500


# 角色新增和修改
@privilege.route('/roleEdit', methods=['POST'])
@permission_required(URL_PREFIX + '/roleEdit')
@cross_origin()
def roleEdit():
    try:
        role_id = request.get_json()['role_id']
        name = request.get_json()['name']
        remark = request.get_json()['remark']
        if role_id == 0:
            role.create(name=name, remark=remark, is_valid=1, update_time=datetime.datetime.now())
        else:
            role.update(name=name, remark=remark, update_time=datetime.datetime.now()).where(role.id == role_id).execute()
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 角色禁用
@privilege.route('/roleDisable', methods=['POST'])
@permission_required(URL_PREFIX + '/roleDisable')
@cross_origin()
def roleDisable():
    try:
        role_id = request.get_json()['role_id']
        role.update(is_valid=0, update_time=datetime.datetime.now()).where(role.id == role_id).execute()
        pf.del_role_to_redis(role_id)
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 角色启用
@privilege.route('/roleEnable', methods=['POST'])
@permission_required(URL_PREFIX + '/roleEnable')
@cross_origin()
def roleEnable():
    try:
        role_id = request.get_json()['role_id']
        role.update(is_valid=1, update_time=datetime.datetime.now()).where(role.id == role_id).execute()
        pf.flush_role_privilege_to_redis(role_id)
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 角色删除
@privilege.route('/roleDelete', methods=['POST'])
@permission_required(URL_PREFIX + '/roleDelete')
@cross_origin()
def roleDelete():
    try:
        role_id = request.get_json()['role_id']
        role_status = role.get(role.id == role_id).is_valid
        if role_status == 0:
            role.update(is_valid=-1, update_time=datetime.datetime.now()).where(role.id == role_id).execute()
            pf.del_role_to_redis(role_id)
            return jsonify({'code': 200, 'msg': '成功！'})
        else:
            return jsonify({'code': 500, 'msg': '失败！删除前请先禁用角色'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


#权限列表获取
@privilege.route('/privilegeGet', methods=['GET'])
@permission_required(URL_PREFIX + '/privilegeGet')
@cross_origin()
def privilegeGet():
    try:
        return jsonify({'code': 200, 'msg': '成功！', 'data': privilege_list_get()})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


#权限新增和修改
@privilege.route('/privilegeEdit', methods=['POST'])
@permission_required(URL_PREFIX + '/privilegeEdit')
@cross_origin()
def privilegeEdit():
    try:
        privilege_id = request.get_json()['privilege_id']
        name = request.get_json()['name']
        mark = request.get_json()['mark']
        remark = request.get_json()['remark']
        if privilege_id == 0:
            if cf.is_data_existed_in_db(privilege_model, privilege_model.name, name):
                response = {'code': 406, 'msg': '已经存在相同名称的权限'}
            elif cf.is_data_existed_in_db(privilege_model, privilege_model.mark, mark):
                response = {'code': 406, 'msg': '已经存在相同标识的权限'}
            else:
                privilege_model.create(name=name, mark=mark, remark=remark, is_valid=1, update_time=datetime.datetime.now())
        else:
            privilege_model.update(name=name, mark=mark, remark=remark, update_time=datetime.datetime.now()).where(privilege_model.id == privilege_id).execute()
        response = {'code': 200, 'msg': '成功！'}
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 权限禁用
@privilege.route('/privilegeDisable', methods=['POST'])
@permission_required(URL_PREFIX + '/privilegeDisable')
@cross_origin()
def privilegeDisable():
    try:
        privilege_id = request.get_json()['privilege_id']
        privilege_model.update(is_valid=0, update_time=datetime.datetime.now()).where(privilege_model.id == privilege_id).execute()
        pf.flush_privilege_which_belongs_to_role_with_target_privilege_to_redis(privilege_id)
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 权限启用
@privilege.route('/privilegeEnable', methods=['POST'])
@permission_required(URL_PREFIX + '/privilegeEnable')
@cross_origin()
def privilegeEnable():
    try:
        privilege_id = request.get_json()['privilege_id']
        privilege_model.update(is_valid=1, update_time=datetime.datetime.now()).where(privilege_model.id == privilege_id).execute()
        pf.flush_privilege_which_belongs_to_role_with_target_privilege_to_redis(privilege_id)
        return jsonify({'code': 200, 'msg': '成功！'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500


# 权限删除
@privilege.route('/privilegeDelete', methods=['POST'])
@permission_required(URL_PREFIX + '/privilegeDelete')
@cross_origin()
def privilegeDelete():
    try:
        privilege_id = request.get_json()['privilege_id']
        privilege_status = privilege_model.get(privilege_model.id == privilege_id).is_valid
        if privilege_status == 0:
            privilege_model.update(is_valid=-1, update_time=datetime.datetime.now()).where(privilege_model.id == privilege_id).execute()
            pf.flush_privilege_which_belongs_to_role_with_target_privilege_to_redis(privilege_id)
            return jsonify({'code': 200, 'msg': '成功！'})
        else:
            return jsonify({'code': 500, 'msg': '失败！删除前请先禁用权限'})
    except Exception as e:
        traceback.print_exc()
        response = {'code': 500, 'msg': '失败！错误信息：' + str(e) + '，请联系管理员。', 'data': []}
        return jsonify(response), 500
