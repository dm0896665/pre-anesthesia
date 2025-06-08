package com.github.dm0896665.pre_anesthesia.model.quiz;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;

public class Question {
    private String answer;
    private HashMap<String, PointData> points;

    public Question(String answer, HashMap<String, PointData> points) {
        this.answer = answer;
        this.points = points;
    }

    public Question() {
    }

    @JsonAnyGetter
    public Map<String, HashMap<String, PointData>> getProperties() {
        Map question = new HashMap<>();
        question.put(answer, points);
        return question;
    }

    @JsonAnySetter
    public void setProperty(String answer, HashMap<String, PointData> points) {
        this.answer = answer;
        this.points = points;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public HashMap<String, PointData> getPoints() {
        return points;
    }

    public void setPoints(HashMap<String, PointData> points) {
        this.points = points;
    }
}
