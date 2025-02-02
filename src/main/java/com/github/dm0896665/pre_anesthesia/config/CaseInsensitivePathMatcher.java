package com.github.dm0896665.pre_anesthesia.config;

import org.springframework.util.AntPathMatcher;

import java.util.Map;

class CaseInsensitivePathMatcher extends AntPathMatcher{

    @Override
    protected boolean doMatch(String pattern, String path, boolean fullMatch, Map<String, String> uriTemplateVariables) {
        return super.doMatch(pattern.toLowerCase(), path.toLowerCase(), fullMatch, uriTemplateVariables);
    }
}
