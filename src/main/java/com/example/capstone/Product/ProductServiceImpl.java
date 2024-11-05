// com.example.capstone.Item.ItemService.java
package com.example.capstone.Product;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{


    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductDTO create(ProductDTO productDTO) {
        // 상품 이름 , 사이즈 , 상품 종류가 같은 상품이 db에 존재하면 해당 상품의 갯수 증가
        Product product = productRepository.findByNameAndItemTypeAndSize(
                productDTO.getName(),
                productDTO.getItemType(),
                productDTO.getSize()
        );

        if ( product != null ) {
            //System.out.println("존재하는 product = " + product);
            product.increaseAmount(productDTO.getAmount());
            productRepository.save(product);
            return ProductDTO.toDTO(product);
        } else { // 없으면 새로운 상품 생성

            Product newProduct = new Product(

                    productDTO.getName(),
                    productDTO.getPrice(),
                    productDTO.getAmount(),
                    productDTO.getOrder(),
                    productDTO.getSize(),
                    productDTO.getItemType(),
                    productDTO.getItemImage()
            );
            productRepository.save(newProduct);

            return ProductDTO.toDTO(newProduct);
        }
    }

    @Override
    public ProductDTO update(Long id, ProductUpdateRequestDTO productUpdateRequestDTO) {
        // 상품 수정 메서드
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 상품이 존재하지 않습니다: " + id));
        product.setName(productUpdateRequestDTO.getName());
        product.setPrice(productUpdateRequestDTO.getPrice());
        product.setAmount(productUpdateRequestDTO.getAmount());
        product.setOrder(productUpdateRequestDTO.getOrder());
        product.setSize(productUpdateRequestDTO.getSize());
        product.setItemType(productUpdateRequestDTO.getItemType());
        product.setItemImage(productUpdateRequestDTO.getItemImage());

        productRepository.save(product);
        ProductDTO productDTO = ProductDTO.toDTO(product);
        return productDTO;
    }

    @Override
    public void delete(Long id) {
        // 해당 id의 상품 삭제 , 없는번호면 오류발생
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 상품이 존재하지 않습니다: " + id));
        productRepository.deleteById(id);
    }

    @Override
    public ProductListResponseDTO productList() {
        List<Product> productList = productRepository.findAll();
        // 조회한 리스트들을 DTO 형태로 변경
        ProductListResponseDTO productListResponseDTO = ProductListResponseDTO.toDTO(productList);
        return productListResponseDTO;
    }

    @Override
    public ProductDTO productDetail(Long id) {
        //상품 상세 정보 출력
        Optional<Product> product = productRepository.findById(id);
        ProductDTO productDTO = ProductDTO.toDTO(product.get());
        return productDTO;
    }

    @Override
    public ProductListResponseDTO productCategory(String category) {
        //특정 카테고리의 상품 리스트 출력
        List<Product> product = productRepository.findByItemType(category);
        ProductListResponseDTO productListResponseDTO = ProductListResponseDTO.toDTO(product);

        return productListResponseDTO;
    }

    @Override
    public List<Product> getProductsSortedByPriceAsc() {
        return productRepository.findAllByOrderByPriceAsc();
    }

    @Override
    public List<Product> getProductsSortedByPriceDesc() {
        return productRepository.findAllByOrderByPriceDesc();
    }
    // Business methods for Item
}