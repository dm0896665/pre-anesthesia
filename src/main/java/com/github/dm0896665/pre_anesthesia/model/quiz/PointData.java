package com.github.dm0896665.pre_anesthesia.model.quiz;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;

public class PointData {
    private Map<String, Integer> properties = new HashMap<>();

    public PointData(String name, Integer value) {
        properties.put(name, value);
    }

    public PointData() {
    }

    @JsonAnyGetter
    public Map<String, Integer> getProperties() {
        return properties;
    }

    @JsonAnySetter
    public void setProperty(String name, Integer value) {
        properties.put(name, value);
    }
}
