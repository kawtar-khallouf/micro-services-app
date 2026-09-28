package com.enset.billingservice.model;

import lombok.*;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Customer {
    private Long id;
    private String name;
    private String email;
}