odoo.define('pos_chque_information.pos', function(require) {
	"use strict";

	var models = require('point_of_sale.models');
	var field_utils = require('web.field_utils');
	var utils = require('web.utils');
	var core = require('web.core');
	const PaymentScreen = require('point_of_sale.PaymentScreen');	
	const { useListener } = require('web.custom_hooks');
	const Registries = require('point_of_sale.Registries');
	const { Gui } = require('point_of_sale.Gui');
	 const PosComponent  = require('point_of_sale.PosComponent');
	var QWeb = core.qweb;
	var _t = core._t;



	

	models.load_models({
		model: 'res.bank',
		fields: ['id','name'],
		loaded: function(self, bank){
			self.bank = bank;
		},
	});
	
	models.load_models({
		model:  'pos.payment.method',
		fields: ['name', 'is_cash_count', 'use_payment_terminal', 'pos_l10n_ar_cheque_info'],
		domain: function(self, tmp) {
			return [['id', 'in', tmp.payment_method_ids]];
		},
		loaded: function(self, payment_methods) {
			self.payment_methods = payment_methods.sort(function(a,b){
				// now prefer cash payment_method to be first in the list
				if (a.is_cash_count && !b.is_cash_count) {
					return -1;
				} else if (!a.is_cash_count && b.is_cash_count) {
					return 1;
				} else {
					return a.id - b.id;
				}
			});
			self.payment_methods_by_id = {};
			_.each(self.payment_methods, function(payment_method) {
				self.payment_methods_by_id[payment_method.id] = payment_method;

				var PaymentInterface = self.electronic_payment_interfaces[payment_method.use_payment_terminal];
				if (PaymentInterface) {
					payment_method.payment_terminal = new PaymentInterface(self, payment_method);
				}
			});
		}
	});

	var posorder_super = models.Order.prototype;
	models.Order = models.Order.extend({
		initialize: function(attr, options) {
			posorder_super.initialize.apply(this,arguments);       
			this.bank_id = this.bank_id || false;
			this.owner_name = this.owner_name || false;
			this.bank_account = this.bank_account || false;
			this.cheque_number = this.cheque_number || false;
			this.check_issue_date = this.check_issue_date || false;
		},

		export_as_JSON: function() {
			var json = posorder_super.export_as_JSON.apply(this,arguments);
			json.bank_id = this.bank_id;
			json.owner_name = this.owner_name;
			json.bank_account = this.bank_account;
			json.cheque_number = this.cheque_number;
			json.check_issue_date = this.check_issue_date;

			return json;
		},
		init_from_JSON: function(json) {
			posorder_super.init_from_JSON.apply(this,arguments);
			this.bank_id = json.bank_id;
			this.owner_name = json.owner_name;
			this.bank_account = json.bank_account;
			this.cheque_number = json.cheque_number;
			this.check_issue_date = json.check_issue_date;
		},

		get_bank_name: function() {
			return this.bank_id
		},
		set_bank_name:function(bank_id) {
			this.bank_id = bank_id;
			this.trigger('change');
		},

		get_owner_name:function() {
			return this.owner_name 
		},
		set_owner_name:function(owner_name) {
			this.owner_name = owner_name
			this.trigger('change');
		},

		get_bank_account:function() {
			return this.bank_account 
		},
		set_bank_account:function(bank_account) {
			this.bank_account = bank_account
			this.trigger('change');
		},

		get_cheque_number:function() {
			return this.cheque_number 
		},
		set_cheque_number:function(cheque_number) {
			this.cheque_number = cheque_number
			this.trigger('change');
		},

		get_check_issue_date:function() {
			return this.check_issue_date 
		},
		set_check_issue_date:function(check_issue_date) {
			this.check_issue_date = check_issue_date
			this.trigger('change');
		},


		add_paymentline: function(payment_method) {

					
			let self = this;
			function onClick() {

					
					Gui.showPopup('ChequeInfoPopup', {
					body: 'Cheque',
					startingValue: self,
					list: self.pos.bank,
                    title : _t("Cheque Info"),

                });
					

				}

			// console.log('add_paymentline');
			var newPaymentline = posorder_super.add_paymentline.apply(this, arguments);
			
			// chequeo si es cheque
			if(newPaymentline.payment_method.pos_l10n_ar_cheque_info) {
				onClick();

			}
			
	        return newPaymentline;

    	},


		

	});


	




	const PosPaymentScreenCheque = (PaymentScreen) =>
		class extends PaymentScreen {
			constructor() {
				super(...arguments);
				useListener('cheque-bank', this.chequeinfo);
				let self = this;
				

			}



			chequeinfo(event) {
				let self = this;
				this.showPopup('ChequeInfoPopup', {
					body: 'Cheque',
					startingValue: self,
					list: self.env.pos.bank,
                    title: this.env._t('Cheque Info'),
                });
			}
		
		};




	Registries.Component.extend(PaymentScreen, PosPaymentScreenCheque);

	return PosPaymentScreenCheque;
});