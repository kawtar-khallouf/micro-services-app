package com.enset.billingservice.feign;

import com.enset.billingservice.model.Product;
//import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "INVENTORY-SERVICE")
public interface InventoryServiceRestClient {
    @GetMapping("/products/{id}")
   @CircuitBreaker(name = "inventoryService", fallbackMethod = "getDefaultProduct")
    Product getProductById(@PathVariable Long id);

    default Product getDefaultProduct(Long id, Exception e) {
        return Product.builder()
                .id(id)
                .name("Not Available")
                .price(0.0)
                .quantity(0)
                .build();
    }
}
