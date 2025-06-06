package com.github.dm0896665.pre_anesthesia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@SpringBootApplication(scanBasePackages = "com.github.dm0896665.pre_anesthesia")
//@EnableJpaRepositories(basePackages = "com.github.dm0896665.pre_anesthesia.dao")
@EntityScan(basePackages = "com.github.dm0896665.pre_anesthesia.model")
public class PreAnesthesiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PreAnesthesiaApplication.class, args);
	}

}
