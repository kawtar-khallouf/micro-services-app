package com.enset.customerservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RefreshScope
public class ConfigTestRestController {
    private final CustomerConfigParams customerConfigParams;

    public ConfigTestRestController(CustomerConfigParams customerConfigParams) {
        this.customerConfigParams = customerConfigParams;
    }

    @Value("${global.params.p1}")
    private String p1;

    @Value("${global.params.p2}")
    private String p2;

    @Value("${customer.params.x}")
    private String x;

    @Value("${customer.params.y}")
    private String y;

    @GetMapping("/testConfig1")
    public Map<String, String> configTest() {
        return Map.of("p1", p1, "p2", p2, "x", x, "y", y);
    }

    @GetMapping("/testConfig2")
    public CustomerConfigParams getConfig() {
        return customerConfigParams;
    }
}