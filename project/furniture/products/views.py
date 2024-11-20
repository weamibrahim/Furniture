from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializes import ProductSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import Product
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from rest_framework.parsers import MultiPartParser, FormParser
import cloudinary
import cloudinary.uploader
# use function based views

@api_view(['GET'])
def getProducts(request):
    # if not use pagination
    # products = Product.objects.all()
    # serializer = ProductSerializer(products, many=True)
    # return Response(serializer.data)
    
    # use pagination
    products = Product.objects.all().order_by('id')
    
    paginator = PageNumberPagination()
    paginator.page_size = 6
    paginator_products = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(paginator_products, many=True)
    return paginator.get_paginated_response(serializer.data)

                    #########################################################################
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProduct(request, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

                     ######################################################################### 
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def createProduct(request):
    data = request.data.copy()
    
    if 'image' in request.FILES:
        image = request.FILES['image']
        
        
        upload_response = cloudinary.uploader.upload(image)
        image_url = upload_response.get('secure_url')
        print("Uploaded Image URL:", image_url)
        
     
        data['image'] = image_url

    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        # product = serializer.save()
        
        product = serializer.save(image=image_url)
        print("Saved Product:", product.image)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                      #########################################################################
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def updateProduct(request, id):
    product = Product.objects.get(id=id)
    
    # Create a copy of the data to modify
    data = request.data.copy()
    data.pop('created_at', None)  # Remove created_at if it exists

    # Check if there is a new image, if so, upload the new image to Cloudinary
    if 'image' in request.FILES:
        image = request.FILES['image']
        upload_response = cloudinary.uploader.upload(image)
        image_url = upload_response.get('secure_url')
        data['image'] = image_url
    else:
        # If no new image is provided, retain the old image
        data['image'] = product.image

    # Serialize and update product details
    serializer = ProductSerializer(instance=product, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                       #########################################################################

@api_view(['DELETE'])
@permission_classes([ IsAuthenticated,IsAdminUser])
def deleteProduct(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    return Response("Product deleted")

                       ######################################################################### 
@api_view(['GET'])
def searchProductByName(request):
    if request.method == 'GET':
        query = request.GET.get('name', '').strip()
        print(query)
        products = Product.objects.filter(name__icontains=query)
        print(products)
        if not products:
            return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(products, many=True)
        print(serializer.data) 
        return Response(serializer.data)
    
@api_view(['GET'])    
def searchByCategory(request): 
    if request.method == 'GET':
        query = request.GET.get('category')
        products = Product.objects.filter(category__icontains=query)
        if not products:
            return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
   
    
    
######################################################################################################################### 

# use class based views by generics

# class ProductListCreateView(ListCreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
       
                              #######################################################
    
# class ProductRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     lookup_field = 'id'
    
        


#########################################################################################################################

# @api_view(['GET', 'POST'])
# def getOrCreateProduct(request):
#     if request.method == 'GET':
#         products = Product.objects.all()
#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#          serializer = ProductSerializer(data=request.data)
#          if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#          else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


                             ############################################################################
  
# @api_view(['GET', 'PUT', 'DELETE'])
# def getOrUpdateOrDeleteProduct(request, id):
#     if request.method == 'GET':
#         product = Product.objects.get(id=id)
#         if not product:
#             return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
#         serializer = ProductSerializer(product, many=False)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         product = Product.objects.get(id=id)
#         if not product:
#             return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
#         serializer = ProductSerializer(instance=product, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#         return Response(serializer.data)

#     elif request.method == 'DELETE':
#         product = Product.objects.get(id=id)
#         if not product:
#             return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
#         product.delete()
#         return Response("Product deleted")