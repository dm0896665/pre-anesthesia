package com.github.dm0896665.pre_anesthesia.config;

import freemarker.template.TemplateModelException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.PathMatcher;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApplicationConfiguration implements WebMvcConfigurer {

    //Configuration
//    @Autowired
//    private freemarker.template.Configuration configuration;
//
//    @PostConstruct
//    public void configuration() throws TemplateModelException {
//        // add globe variable
//        this.configuration.setSharedVariable("app", "Spring Boot");
//    }
    /**
     * Creates a patchMatcher bean that matches case insensitively
     * @return PathMatcher
     */
    @Bean
    public PathMatcher pathMatcher() {
        return new CaseInsensitivePathMatcher();
    }

    /**
     * Overrides the configurePathMatch() method in WebMvcConfigurerAdapter
     * <br/>Allows us to set a custom path matcher, used by the MVC for @RequestMapping's
     * @param configurer
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setPathMatcher(pathMatcher());
    }
}
