
from odoo import api, fields, tools, models, _
from odoo.exceptions import UserError



class PosConfig(models.Model):
	_inherit = 'pos.config'

	@api.depends('invoice_journal_id')
	def _compute_journal_used_documents(self):
		for config in self:
			invoice_journal_id = config.invoice_journal_id
			config.journal_used_documents = False		
			if config.module_account and invoice_journal_id and 'l10n_latam_use_documents' in invoice_journal_id and invoice_journal_id.l10n_latam_use_documents:
				config.journal_used_documents = True

	journal_used_documents = fields.Boolean(string = 'Journal used documents?', compute='_compute_journal_used_documents')
	invoice_background = fields.Boolean(string = 'Invoice background?', default=False)
	partner_default = fields.Many2one('res.partner', string = 'Partner default')
	invisible_button_invoice = fields.Boolean(string='Invisible print invoice', default=False)

	@api.onchange('invoice_background')
	def _onchange_invoice_background(self):
		for c in self:
			if not c.invoice_background:
				c.invisible_button_invoice = False