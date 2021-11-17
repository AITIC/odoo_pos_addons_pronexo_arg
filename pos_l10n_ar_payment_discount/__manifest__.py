# -*- coding: utf-8 -*-
{
    'name': "POS Payment Discount",
    'author': "Pronexo",
    'version': '15.0.1.1.0',
    'website': "https://www.pronexo.com",
    'license' : "OPL-1",
    'images':["static/description/images/pos_payment_discount_home.png"],

    'summary': """
        El módulo permite aplicar descuento para un método de pago definido en el POS...
        """,

    'description': """
        Establecer el valor de descuento en la configuración del método de pago.
        En la pantalla de pago POS, puede aplicar el mismo descuento haciendo clic en algún método de pago en particular.
    """,
    'price': 35.00,
    'currency': 'USD',
    'category': 'Sales/Point of Sale',

    # any module necessary for this one to work correctly
    'depends': ['point_of_sale'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_l10n_ar_payment_discount/static/src/js/models.js',
        ],
        'web.assets_qweb': [
            'pos_l10n_ar_payment_discount/static/src/xml/**/*',
        ],
    },
    'auto_install': False,
    'installable': True,
}
