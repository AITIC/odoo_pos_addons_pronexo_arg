# -*- coding: utf-8 -*-

from odoo import models, fields, api


class pos_payment_method(models.Model):
    _inherit = 'pos.payment.method'
    _description = 'Add fields to identify journal as discountable'

    fixed_discount = fields.Boolean()
    discount = fields.Float()
    