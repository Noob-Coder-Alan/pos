import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

import '../../../../../models/product.dart';
import '../modes/mode_view.dart';
import '../top_product/top_products_widget.dart';

class MonthViewWidget extends StatelessWidget {
  final List<Product> products;
  final List<Product> topThree;

  const MonthViewWidget({@required this.products, @required this.topThree});

  @override
  Widget build(BuildContext context) {
    // TODO: Make infinitely scrollable
        return Column(
        children: [
          Expanded(
            child: TopProductsWidget(products: topThree),
          ),
          ModeView(products: products),
        ],
      
    );
  }
}
