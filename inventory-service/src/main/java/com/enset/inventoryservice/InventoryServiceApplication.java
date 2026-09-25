package com.enset.inventoryservice;

import com.enset.inventoryservice.entities.Product;
import com.enset.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder().name("Computer").price(3200).quantity(12).build());
            productRepository.save(Product.builder().name("Printer").price(1200).quantity(10).build());
            productRepository.save(Product.builder().name("Smartphone").price(8000).quantity(30).build());
        };
    }
}