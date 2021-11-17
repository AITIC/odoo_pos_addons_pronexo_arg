odoo.define("pos_payment_discount.models", function(require){
    "use strict"

    var models = require("point_of_sale.models");
    var utils = require("web.utils");
    var round_di = utils.round_decimals;
    var round_pr = utils.round_precision;

    models.load_fields('pos.payment.method', ['fixed_discount','discount']);

    var posorder_super = models.Order.prototype;

    models.Order = models.Order.extend({
        
            add_paymentline: function(payment_method) {
            console.log('add_paymentline');


            var newPaymentline = posorder_super.add_paymentline.apply(this, arguments);

            $('.paymentmethod').css({
                    "display" : 'none'
                })
        
            return newPaymentline;
        },

        remove_paymentline: function(line) {
            if(this.selected_paymentline === line && this.selected_paymentline.payment_method.fixed_discount){
                this.orderlines.each(function(line) {
                    line.set_discount(0);
                })
            }
            posorder_super.remove_paymentline.apply(this, arguments);
            var total_jm = this.pos.get_order().get_total_with_tax();
            var total_paid_jm = this.pos.get_order().get_total_paid();
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
        }
    });

    var _super_paymentline = models.Paymentline.prototype;
    models.Paymentline = models.Paymentline.extend({
        set_amount: function (value) {
            _super_paymentline.set_amount.apply(this, arguments);
            if(this.payment_method.fixed_discount){
                var method_total = 0;
                this.order.get_paymentlines().forEach(line => {
                    if(line.payment_method.fixed_discount) {

                        method_total += line.amount;
                    }
                })
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
                
            } else {
                var fixed_discount = false;
                this.order.get_paymentlines().forEach(line => {
                    if(line.payment_method.fixed_discount) {
                        fixed_discount = true;
                    }
                })
                if(!fixed_discount) {
                    this.order.orderlines.each(function(line){
                        line.set_discount(0);
                    });
                }
            }



            var total_jm = this.order.get_total_with_tax();
            var total_paid_jm = this.order.get_total_paid();
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
        }
    })

});