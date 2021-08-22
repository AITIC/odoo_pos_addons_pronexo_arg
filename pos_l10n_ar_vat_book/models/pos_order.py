from odoo import api, fields, tools, models, _
from odoo.exceptions import UserError



class PosOrder(models.Model):
	_inherit = 'pos.order'

	@api.model
	def _process_order(self, order, draft, existing_order):

		result = super(PosOrder, self)._process_order(order, draft, existing_order)
		pos_order = self.browse(result)
		print('_process_order id: ', result)
		if pos_order.config_id.invoice_background and pos_order.partner_id and not pos_order.is_invoiced and pos_order.state == 'paid':
			pos_order.action_pos_order_invoice()
			pos_order.account_move.sudo().with_context(force_company=self.env.user.company_id.id).post()
		return result