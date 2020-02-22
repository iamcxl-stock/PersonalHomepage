import datetime
from ..model.app_model import app as app_table
from ..model.app_model import app_price
from ..model.app_model import app_push


def app_get(user_id=0):
    '''
        获取用户id下有效的app，user_id不传则获取全部
    '''
    if user_id == 0:
        app_table_query = app_table.select().where(app_table.is_valid == 1).dicts()
    else:
        app_table_query = app_table.select().where((app_table.user_id == user_id) & (app_table.is_valid == 1)).order_by(app_table.order).dicts()
    result = [{
        row['id'], row['name'], row['except_price'], row['notify'], row['notify_method'], row['notify_interval_raw'], row['notify_interval_unit'], row['notify_interval'], row['notify_trigger_time'],
        row['update_time']
    } for row in app_table_query]
    return result


def app_price_get(app_id):
    app_price_query = app_price.select().where(app_price.app_id == app_id).order_by(app_price.update_time).limit(1).dicts()
    return app_price_query['price']


def app_del_all(user_id):
    '''
        将用户id下的app置为删除状态
    '''
    app_table.update(is_valid=0, update_time=datetime.datetime.now()).where((app_table.user_id == user_id) & (app_table.is_valid == 1)).execute()


def push_get():
    '''
        返回生效状态的推送列表
        return List[id, user_id, notify, notify_method, notify_interval_raw, notify_interval_unit, notify_interval, notify_trigger_time]
    '''
    app_push_valids = app_push.select().where((app_push.is_valid == 1) & (app_push.trigger_time <= datetime.datetime.now())).dicts()
    return [{
        app_push_valid['id'], app_push_valid['user_id'], app_push_valid['notify'], app_push_valid['notify_method'], app_push_valid['notify_interval_raw'], app_push_valid['notify_interval_unit'],
        app_push_valid['notify_interval'], app_push_valid['notify_trigger_time']
    } for app_push_valid in app_push_valids]


def push_app_get():
    app_push_valids = app_push.select().where(app_push.is_valid == 1).dicts()
    return [{app_push_valid['user_id']} for app_push_valid in app_push_valids]
