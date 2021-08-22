odoo.define('pos_l10n_ar_vat_book.screens', function (require) {
    "use strict";
    var screens = require('point_of_sale.screens');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var utils = require('web.utils');
    var field_utils = require('web.field_utils');

    var QWeb = core.qweb;
    var round_di = utils.round_decimals;
    var round_pr = utils.round_precision;
    var _t = core._t;


    screens.PaymentScreenWidget.include({

        renderElement: function() {
            var self = this;
            this._super();            
          
            if (this.pos.config.invisible_button_invoice && this.pos.config.invoice_background) {
               this.$('.js_invoice').addClass('oe_hidden');
            }
        },
        finalize_validation: function() {
            var self = this;
            var order = this.pos.get_order();
            //console.info('finalize_validation ');
            if (!order.is_to_invoice() && this.pos.config.invoice_background){
                var client = self.pos.get_order().get_client();
                //console.info('finalize_validation client: ', client);
                if (!client){
                    //console.info('null client ');
                    this.gui.show_popup('confirm',{
                        'title': _t('Please select the Customer'),
                        'body': _t('You need to select the customer before you can invoice an order.'),
                        confirm: function(){
                            self.gui.show_screen('clientlist', null, false);
                        },
                    });
                }else{
                    this._super();
                }
            }else{
                this._super();
            }
             
            
            
        },
       

    });

    

    
    
});
