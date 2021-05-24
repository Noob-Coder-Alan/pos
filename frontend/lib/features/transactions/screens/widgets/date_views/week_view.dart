import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

import '../../../../../models/product.dart';
import '../../../../../repositories/transactions/interval.dart' as interval_i;
import '../modes/mode_view.dart';
import '../top_product/top_products_widget.dart';

class WeekViewWidget extends StatelessWidget {
  final List<Product> products;
  final List<Product> topThree;

  const WeekViewWidget({@required this.products, @required this.topThree});

  @override
  Widget build(BuildContext context) {
    // TODO: Make infinitely scrollable
    return Column(
      children: [
        Expanded(
          child: TopProductsWidget(
            products: topThree,
            interval: interval_i.Interval.week,
          ),
        ),
        ModeView(products: products),
      ],
    );
  }
}
