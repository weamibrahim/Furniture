from django.urls import path

from . import views

urlpatterns = [
  
    path('products/', views.getProducts, name='getProducts'),
    path('products/<int:id>/', views.getProduct, name='getProduct'),
    path('products/create/', views.createProduct, name='createProduct'),
    path('products/update/<int:id>/', views.updateProduct, name='updateProduct'),
    path('products/delete/<int:id>/', views.deleteProduct, name='deleteProduct'),
    
#  use generics
# #  path('products/list/', views.ProductListCreateView.as_view(), name='product_list'),
#  path('products/list/<int:id>/', views.ProductRetrieveUpdateDestroyView.as_view(), name='product_detail'),
    
# use function based views 
#   path('products/', views.getOrCreateProduct, name='getOrCreateProduct'),
#   path('products/<int:id>/', views.getOrUpdateOrDeleteProduct, name='getOrUpdateOrDeleteProduct'),
]