odoo.define("pos_payment_discount.models", function(require){
	"use strict"

	var models = require("point_of_sale.models");
	var utils = require("web.utils");
	var round_di = utils.round_decimals;
	var round_pr = utils.round_precision;

	models.load_fields('pos.payment.method', ['fixed_discount','discount']);

	var posorder_super = models.Order.prototype;

	models.Order = models.Order.extend({


		remove_paymentline: function(line){


			console.log('remove_paymentline');
        	this.assert_editable();
        	if(this.selected_paymentline === line){
            this.select_paymentline(undefined);
        	}
        	this.paymentlines.remove(line);
        	
        	var lines = this.pos.get_order().get_paymentlines();
        	var order = this.pos.get_order();

        		if(lines.length<1){

					order.orderlines.each(function (line) {
							line.set_discount(0);
						});

					//agrego para que se vean los medios de pago
					$('.paymentmethod').css({
					"display" : 'block'
					})

				}


			var total_jm = order.get_total_with_tax();
			var total_paid_jm = order.get_total_paid();
			var remaining_jm = total_jm - total_paid_jm;

			if(total_paid_jm<total_jm){

			
				$('.paymentmethod').css({
					"display" : 'block'
				})
			

			}else{

				$('.paymentmethod').css({
					"display" : 'none'
				})

			}




    	},


    	    add_paymentline: function(payment_method) {
			console.log('add_paymentline');


			var newPaymentline = posorder_super.add_paymentline.apply(this, arguments);

			
			/*if(newPaymentline.payment_method.fixed_discount) {
				this.orderlines.each(function(line){
					line.set_discount(payment_method.discount);
				});
			} else {
				this.orderlines.each(function(line){
					line.set_discount(0);
				});
			}*/

			$('.paymentmethod').css({
					"display" : 'none'
				})
		
	        return newPaymentline;
    	}



		// add_paymentline: function(payment_method) {
		// 	// console.log('add_paymentline');
		// 	var newPaymentline = posorder_super.add_paymentline.apply(this, arguments);
		// 	var amount = newPaymentline.get_amount();
		// 	// console.log(amount);
		// 	if(payment_method.fixed_discount) {
		// 		var discount = payment_method.discount;
		// 		this.orderlines.each(function(line){
		// 			// newPaymentline.set_amount(amount - (amount/ 100 * discount));
		// 			line.set_discount(payment_method.discount);
		// 		});
		// 	}
		// 	// console.log(newPaymentline.amount);
		// 	// newPaymentline.set_amount(this.get_due()/10);
	    //     return newPaymentline;
    	// },
    	// get_due: function(paymentline) {
    	// 	console.log(paymentline);
		// 	var due = posorder_super.get_due.apply(this, arguments);
		// 	if(this.selected_paymentline){
		// 		if(this.selected_paymentline.payment_method.fixed_discount){
		// 			console.log(due);
		// 			var percent_due = due-this.selected_paymentline.buffer_value;
		// 			console.log(percent_due);
		// 			return percent_due;
		// 		} else 
		// 		{
		// 			return due;
		// 		}
		// 	}
       	// }
	});

	var _super_paymentline = models.Paymentline.prototype;
	models.Paymentline = models.Paymentline.extend({
		set_amount: function (value) {
			_super_paymentline.set_amount.apply(this, arguments);
			if(this.payment_method.fixed_discount){
				if (this.order.get_total_discount() > 0) {
					this.order.orderlines.each(function(line){
						line.set_discount(0);
					});
				}
				console.log(value);
				this.buffer_value = value;
				var disc_value = value - (value / 100 * this.payment_method.discount);
				console.log(disc_value)
				var val = value - disc_value;
				console.log(val);
				console.log(this.order.get_total_with_tax());
				var disc = val / this.order.get_total_with_tax() * 100;
				console.log(disc);
				this.order.orderlines.each(function(line){
					// newPaymentline.set_amount(disc_value);
					line.set_discount(disc);
				});
				// this.amount = round_di(parseFloat(disc_value) || 0, this.pos.currency.decimals);
				// this.trigger('change', this);
			} 




			var total_jm = this.order.get_total_with_tax();
			var total_paid_jm = this.order.get_total_paid();
			var remaining_jm = total_jm - total_paid_jm;
		
			if(total_paid_jm<total_jm){

			//alert(remaining_jm+' ddpo');

		
			
				$('.paymentmethod').css({
					"display" : 'block'
				})
			

			}else{

				$('.paymentmethod').css({
					"display" : 'none'
				})

			}
		}
	})

});