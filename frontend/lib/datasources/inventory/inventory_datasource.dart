import '../../features/inventory/models/new_product.dart';
import '../../features/inventory/models/new_variant.dart';
import '../../models/product.dart';
import '../../models/product_variant.dart';


abstract class IInventoryDataSource {
  Future<List<Product>> getProducts();
  Future<Product> getProductDetails({int productId});
}

abstract class IInventoryRemoteDataSource implements IInventoryDataSource {
  Future<Product> addProduct({NewProduct product});
  Future<bool> deleteProduct({int productId});
  Future<bool> changeProductDetails({Product product});
  
  Future<bool> addVariant({
    NewVariant variant,
    int productId
  });
  
  Future<bool> editVariant({ProductVariant variant});
  Future<bool> deleteVariant({int productVariantId});
  Future<bool> deleteAllVariants({int productId});
}

abstract class IInventoryLocalDataSource implements IInventoryDataSource {
  Future<void> cacheProducts(dynamic data);
  Future<void> cacheProduct(dynamic data);
}
