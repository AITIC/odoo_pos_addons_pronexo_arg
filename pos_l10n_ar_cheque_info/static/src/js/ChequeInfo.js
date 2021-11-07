odoo.define('pos_l10n_ar_cheque_info.ChequeInfo', function(require) {
	"use strict";

	var core = require('web.core');
	const { useState, useRef } = owl.hooks;
	const { useListener } = require('web.custom_hooks');
	const PosComponent = require('point_of_sale.PosComponent');
	const Registries = require('point_of_sale.Registries');
	const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
	var QWeb = core.qweb;
	var models = require('point_of_sale.models');

	var _t = core._t;

	class ChequeInfoPopup extends AbstractAwaitablePopup {
		constructor() {
			super(...arguments);
			this.inputselectedeRef = useRef('input-selected');
			this.inputNameRef = useRef('input-name');
			this.inputaccountRef = useRef('input-account');
			this.inputnumberRef = useRef('input-number');
			this.inputcheck_issue_date = useRef('input-checkissuedate');

			
		}
		mounted() {
            this.inputNameRef.el.focus();
            
            //cuando cambia de valor el select del banco y se selecciona cambia el background
            $('.select_bank_id').on('change', function() {
  			$('.select_bank_id').css({
					"background-color" : '#FFFFFF'
				});
			});



            $('.select_issue_date').on('change', function() {
  			$('.select_issue_date').css({
					"background-color" : '#FFFFFF'
				});
			});

			
        }





        getValue() {
        	var order = this.env.pos.get_order()
        	var banco =$('.select_bank_id').val();
        	if(banco==null){
        		alert("Seleccione el Banco!");
        		$('.select_bank_id').css({
					"background-color" : 'rgb(255 0 128 / 24%)'
				});
        		return false;
        	}else{
        		$('.select_bank_id').css({
					"background-color" : '#FFFFFF'
				});
        	}



        	if(this.inputNameRef.el.value==""){
        		alert("Complete Nombre del propietario del Cheque!");
        		$('.input-name-owner').css({
					"background-color" : 'rgb(255 0 128 / 24%)'
				});
        		return false;
        	}else{
        		$('.input-name-owner').css({
					"background-color" : '#FFFFFF'
				});
        	}



        	if(this.inputnumberRef.el.value==""){
        		alert("Complete Número de Cheque!");
        		$('.input-check-number').css({
					"background-color" : 'rgb(255 0 128 / 24%)'
				});
        		return false;
        	}else
        	{
        		$('.input-check-number').css({
					"background-color" : '#FFFFFF'
				});
        	}

        	 if(this.inputcheck_issue_date.el.value==""){
        		alert("Complete Fecha de Pago del Cheque!");
        		$('.select_issue_date').css({
					"background-color" : 'rgb(255 0 128 / 24%)'
				});
        		return false;
        	}else
        	{
        		$('.select_issue_date').css({
					"background-color" : '#FFFFFF'
				});
        	}

        	


        	
        	
        	order.set_bank_name(banco);
			order.set_owner_name(this.inputNameRef.el.value);
			order.set_bank_account(this.inputaccountRef.el.value);
			order.set_cheque_number(this.inputnumberRef.el.value);
			order.set_check_issue_date(this.inputcheck_issue_date.el.value);
			this.trigger('close-popup');
        }
        cancel() {
        	var lines = this.env.pos.get_order().get_paymentlines();
        	var line; 
        	var posorder_super = models.Order.prototype;
        	var cantidad_lineas_pago=lines.length;

        	for ( var i = 0; i < cantidad_lineas_pago; i++ ) {
        			//alert(i);
            		line = lines[i];
        			this.env.pos.get_order().remove_paymentline(line);

        			if(lines.length==0){
        				this.trigger('close-popup');
        				}

        			}


        
        	
        }




	}

	ChequeInfoPopup.template = 'ChequeInfoPopup';
	ChequeInfoPopup.defaultProps = {
        confirmText: 'Ok',
        cancelText: 'Cancel',
        title: '',
        body: '',
        list: [],
        startingValue: '',
    };

	Registries.Component.add(ChequeInfoPopup);

	return ChequeInfoPopup;
});