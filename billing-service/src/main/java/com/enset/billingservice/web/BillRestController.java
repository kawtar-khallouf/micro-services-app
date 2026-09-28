package com.enset.billingservice.web;

import com.enset.billingservice.entities.Bill;
import com.enset.billingservice.feign.CustomerServiceRestClient;
import com.enset.billingservice.feign.InventoryServiceRestClient;
import com.enset.billingservice.repository.BillRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class BillRestController {
    private BillRepository billRepository;
    private final CustomerServiceRestClient customerServiceRestClient;
    private final InventoryServiceRestClient inventoryServiceRestClient;

    @GetMapping("/bills/{id}")
    public Bill getBill(@PathVariable Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        bill.setCustomer(customerServiceRestClient.findCustomerById(bill.getCustomerId()));

        bill.getProductItems().forEach(pi -> {
            pi.setProduct(inventoryServiceRestClient.getProductById(pi.getProductId()));
        });

        return bill;
    }
}