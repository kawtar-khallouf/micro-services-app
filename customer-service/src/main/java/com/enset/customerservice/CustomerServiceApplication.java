package com.enset.customerservice;

import com.enset.customerservice.config.CustomerConfigParams;
import com.enset.customerservice.entities.Customer;
import com.enset.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerRepository customerRepository) {
        return args -> {
            customerRepository.save(Customer.builder().name("Mohammed").email("med@gmail.com").build());
            customerRepository.save(Customer.builder().name("Hassan").email("hassan@gmail.com").build());
            customerRepository.save(Customer.builder().name("Yassine").email("yassine@gmail.com").build());
        };
    }
}