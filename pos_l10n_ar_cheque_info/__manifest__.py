# -*- coding: utf-8 -*-

{
    "name" : "POS Cheque Info",
    "author": "Pronexo",
    "version" : "15.0.1.0",
    "live_test_url":'#',
    "images":["static/images/cheque_info_home.png"],
    'summary': 'POS, cuando realiza el pago con cheque se le solicita información. Módulo para el punto de venta. Guarda detalles des cheque. POS Check l10n_ar',
    "description": """ Este múdulo se utiliza para imprimir información del cheque en el ticket.

     """,
    "license" : "OPL-1",
    "website": "https://www.pronexo.com",
    "depends" : ['base','point_of_sale','l10n_ar_bank'],
    "data": [
        'views/pos_config.xml',
    ],
'assets': {
        'point_of_sale.assets': [
            'pos_l10n_ar_cheque_info/static/src/js/ChequeInfo.js',
            'pos_l10n_ar_cheque_info/static/src/js/Pos.js',
        ],
        'web.assets_qweb': [
            'pos_l10n_ar_cheque_info/static/src/xml/**/*',
        ],
    }, 
    "auto_install": False,
    "installable": True,
    "price": 45,
    "currency": 'EUR',
    "category" : "Point of Sale",
    
}