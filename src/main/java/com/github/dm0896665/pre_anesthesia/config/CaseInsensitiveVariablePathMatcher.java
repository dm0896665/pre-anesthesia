package com.github.dm0896665.pre_anesthesia.config;

import org.springframework.util.AntPathMatcher;

import java.util.HashMap;
import java.util.Map;

class CaseInsensitiveVariablePathMatcher extends AntPathMatcher{

    @Override
    protected boolean doMatch(String pattern, String path, boolean fullMatch, Map<String, String> uriTemplateVariables) {
        boolean superMatch = super.doMatch(pattern.toLowerCase(), path.toLowerCase(), fullMatch, uriTemplateVariables);
        if(superMatch) {
            return true;
        } else {
            for (PatternVariant patternVariant : getPatternVariants(new PatternVariant(pattern))) {
                if (super.doMatch(patternVariant.getPattern(), path, fullMatch, uriTemplateVariables)) {
                    if (uriTemplateVariables != null && patternVariant.getVariables() != null) {
                        uriTemplateVariables.putAll(patternVariant.getVariables());
                    }
                    return true;
                }
            }
        }

        return false;
    }

    public static final String ESCAPE_BEGIN = "[";
    public static final String ESCAPE_END = "]";

    /**
     * stores a request mapping pattern and corresponding variable
     * configuration.
     */
    protected static class PatternVariant {

        private final String pattern;
        private Map variables;

        public Map getVariables() {
            return variables;
        }

        public PatternVariant(String pattern) {
            super();
            this.pattern = pattern;
        }

        public PatternVariant(PatternVariant parent, int startPos, int endPos, boolean include) {
            final String p = parent.getPattern();
            final String varName = p.substring(startPos + 1, endPos);
            this.pattern = p.substring(0, startPos) + (include ? varName : "") + p.substring(endPos + 1);

            this.variables = new HashMap();
            if (parent.getVariables() != null) {
                this.variables.putAll(parent.getVariables());
            }
            this.variables.put(varName, Boolean.toString(include));
        }

        public String getPattern() {
            return pattern;
        }
    }

    /**
     * build recursicly all possible request pattern for the given request
     * pattern. For pattern: /foo/[bar/][test/]{id}, it
     * generates all combinations: /foo/bar/test/{id},
     * /foo/bar/{id} /foo/test/{id}
     * /foo/{id}
     */
    protected PatternVariant[] getPatternVariants(PatternVariant variant) {
        final String pattern = variant.getPattern();
        if (!pattern.contains(ESCAPE_BEGIN)) {
            return new PatternVariant[] { variant };
        } else {
            int startPos = pattern.indexOf(ESCAPE_BEGIN);
            int endPos = pattern.indexOf(ESCAPE_END, startPos + 1);
            PatternVariant[] withOptionalParam = getPatternVariants(new PatternVariant(variant, startPos, endPos, true));
            PatternVariant[] withOutOptionalParam = getPatternVariants(new PatternVariant(variant, startPos, endPos, false));
            return concat(withOptionalParam, withOutOptionalParam);
        }
    }

    /**
     * utility function for array concatenation
     */
    private static PatternVariant[] concat(PatternVariant[] A, PatternVariant[] B) {
        PatternVariant[] C = new PatternVariant[A.length + B.length];
        System.arraycopy(A, 0, C, 0, A.length);
        System.arraycopy(B, 0, C, A.length, B.length);
        return C;
    }
}
