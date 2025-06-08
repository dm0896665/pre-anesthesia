package com.github.dm0896665.pre_anesthesia.model.quiz;

public enum ModelPointWinner {
    CCT("Collaborative Care Team (CCT) model", "cct", "a"),
    ACT("Anesthesia Care Team (ACT) model", "act", "an");
    ModelPointWinner(String name, String code, String article) {
        this.name = name;
        this.code = code;
        this.article = article;
    }

    private String name;
    private String code;
    private String article;

    static ModelPointWinner fromCode(String code) {
        for (ModelPointWinner winner : ModelPointWinner.values()) {
            if (winner.getCode().equals(code)) {
                return winner;
            }
        }

        return null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    @Override
    public String toString() {
        return article + " " + name;
    }
}
