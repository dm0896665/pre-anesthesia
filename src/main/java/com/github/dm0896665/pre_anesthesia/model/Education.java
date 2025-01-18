package com.github.dm0896665.pre_anesthesia.model;

public enum Education {
    HIGH_SCHOOL("High School"),
    SOME_COLLEGE("Some College"),
    BACHELORS("Bachelors"),
    LPN("LPN"),
    ASN("ASN"),
    BSN("BSN"),
    MASTERS("Masters"),
    DOCTORATE("Doctorate");

    private String name;

    Education(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name;
    }
}
