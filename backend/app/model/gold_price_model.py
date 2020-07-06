import os
import peewee
from peewee import CharField, DateTimeField
from .model_function import BaseModel


class gold_price(BaseModel):
    price = CharField()
    update_time = DateTimeField()

    class Meta:
        table_name = 'gold_price'


gold_price.create_table()