# -*- coding: utf-8 -*-

{
    "name" : "POS Cheque Info",
    "author": "Pronexo",
    "version" : "14.0.1.0",
    "live_test_url":'https://youtu.be/HQtbsVh0RdI',
    "images":["static/description/images/cheque_info_home.png"],
    'summary': 'POS, cuando realiza el pago con cheque se le solicita información. Módulo para el punto de venta. Guarda detalles des cheque. POS Check l10n_ar',
    "description": """ Este múdulo se utiliza para imprimir información del cheque en el ticket.

     """,
    "license" : "OPL-1",
    "website": "https://www.pronexo.com",
    "depends" : ['base','point_of_sale'],
    "data": [
        'views/assets.xml',
        'views/pos_config.xml',
    ],
    'qweb': [
    'static/src/xml/pos.xml'
    ],
    "auto_install": False,
    "installable": True,
    "price": 35,
    "currency": 'EUR',
    "category" : "Point of Sale",
    
}