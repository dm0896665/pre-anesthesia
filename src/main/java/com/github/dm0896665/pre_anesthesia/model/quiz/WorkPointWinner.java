package com.github.dm0896665.pre_anesthesia.model.quiz;

public enum WorkPointWinner {
    AMBULATORY("Ambulatory Surgery Center", "ambulatory", "an"),
    HOSPITALS("Hospital", "hospital", "a"),
    TRAUMA("Level 1 Trauma Center", "trauma", "a"),
    EYE("Eye Center", "eye", "an"),
    KETAMINE("Ketamine Clinic", "ketamine", "a");
    WorkPointWinner(String name, String code, String article) {
        this.name = name;
        this.code = code;
        this.article = article;
    }

    private String name;
    private String code;
    private String article;

    static WorkPointWinner fromCode(String code) {
        for (WorkPointWinner winner : WorkPointWinner.values()) {
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
