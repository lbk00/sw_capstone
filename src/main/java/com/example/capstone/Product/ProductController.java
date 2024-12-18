// com.example.capstone.Item.ItemController.java
package com.example.capstone.Product;

import com.example.capstone.DTO.ManagerResponseDTO;
import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Manager.ManagerDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("/products")

public class ProductController {

    private final ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    //상품 생성 api
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO productDTO) {
        ProductDTO newProductDTO = productService.create(productDTO);
        return ResponseEntity.ok().body(newProductDTO);
    }

    //상품 수정 api
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable("id") Long id,
            @RequestBody ProductUpdateRequestDTO productUpdateRequestDTO) { // ProductUpdateRequestDTO로 수정해야함
        // 수정할 상품 id / 수정할 상품 정보
        // 여러개 상품 수정가능하므로 리스트로 입력 받아야함
        ProductDTO productDTO = productService.update(id,productUpdateRequestDTO);
        // 수정된 주문서 반환
        return ResponseEntity.ok(productDTO);
    }

    //상품 삭제 api
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        productService.delete(id);
        return new ResponseEntity<>("product deleted successfully", HttpStatus.OK);
    }
    //상품 목록 조회 api
    @GetMapping(value = "/list")
    public ProductListResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO ) {
        log.info(pageRequestDTO);
        return productService.productList(pageRequestDTO);
    }

    //특정 상품 정보 조회 api
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ProductDTO> productDetail(@PathVariable("id") Long id) {
        // 제품의 번호를 입력 받고, 해당 제품의 정보를 출력
        ProductDTO productDTO = productService.productDetail(id);
        return ResponseEntity.ok(productDTO);
    }

    //특정 카테고리 상품 정보 조회 api
    @RequestMapping(value = "/category/{category}", method = RequestMethod.GET)
    public ResponseEntity<ProductListResponseDTO> productCategory(@PathVariable("category") String categoryName) {
        // 해당 카테고리에 속하는 제품들만 조회
        ProductListResponseDTO productListResponseDTO = productService.productCategory(categoryName);
        return ResponseEntity.ok(productListResponseDTO);
    }

    // 가격 낮은 순으로 정렬된 상품 목록 반환
    @GetMapping("/sorted-by-price-desc")
    public List<Product> getProductsSortedByPriceDesc() {
        return productService.getProductsSortedByPriceDesc();
    }

    // 가격 높은 순으로 정렬된 상품 목록 반환
    @GetMapping("/sorted-by-price-asc")
    public List<Product> getProductsSortedByPriceAsc() {
        return productService.getProductsSortedByPriceAsc();
    }

}