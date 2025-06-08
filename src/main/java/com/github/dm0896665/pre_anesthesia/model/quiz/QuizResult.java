package com.github.dm0896665.pre_anesthesia.model.quiz;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class QuizResult {
    private Map<String, Question> questionData;
    private Map<String, Integer> pathwayTotals = new HashMap<>();
    private Map<String, Integer> workTotals = new HashMap<>();
    private Map<String, Integer> modelTotals = new HashMap<>();
    private boolean isNeedsWork = false;

    public QuizResult(Map<String, Question> map) {
        this.questionData = map;
        ObjectMapper mapper = new ObjectMapper();
        for (String questionNumber : map.keySet()) {
            Question question = mapper.convertValue(map.get(questionNumber), Question.class);
            for (Map.Entry<String, PointData> questionKey : question.getPoints().entrySet()) {
                String pointType = questionKey.getKey();
                PointData pointData = mapper.convertValue(question.getPoints().get(pointType), PointData.class);
                for (Map.Entry<String, Integer> pointKey : pointData.getProperties().entrySet()) {
                    // Total each section of points
                    String pointName = pointKey.getKey();
                    Integer pointValue = pointKey.getValue();
                    Map<String, Integer> pointTotal = getPointTotalMap(pointType);
                    Integer total = 0;
                    if (pointTotal.containsKey(pointName)) {
                        total = pointTotal.get(pointName);
                    }
                    total+=pointValue;
                    pointTotal.put(pointName, total);
                }
            }
        }

        // If they answered "no" on question one, they need work
        if ("2".equals(mapper.convertValue(map.get("1"), Question.class).getAnswer())) {
            isNeedsWork = true;
        }
    }

    private Map<String, Integer> getPointTotalMap(String pointType) {
        if ("pathway".equals(pointType)) {
            return pathwayTotals;
        } else if ("work".equals(pointType)) {
            return workTotals;
        } else if ("model".equals(pointType)) {
            return modelTotals;
        }
        return null;
    }

    public PathwayPointWinner getPathwayPointWinner() {
        return PathwayPointWinner.fromCode(getPointTotalMapWinner(pathwayTotals));
    }

    public WorkPointWinner getWorkPointWinner() {
        WorkPointWinner winner = WorkPointWinner.fromCode(getPointTotalMapWinner(workTotals));
        if (getPathwayPointWinner() != PathwayPointWinner.CRNA && isCRNAOnlyWork(winner)) {
            return WorkPointWinner.fromCode(getPointTotalMapRunnerUp(workTotals));
        }

        return winner;
    }

    public ModelPointWinner getModelPointWinner() {
        return ModelPointWinner.fromCode(getPointTotalMapWinner(modelTotals));
    }

    public boolean hasPathwayPointRunnerUp() {
        return !"".equals(getPointTotalMapRunnerUp(pathwayTotals));
    }

    public boolean hasWorkPointRunnerUp() {
        return !"".equals(getPointTotalMapRunnerUp(workTotals));
    }

    public boolean hasModelPointRunnerUp() {
        if (getPathwayPointWinner() == PathwayPointWinner.AA && getModelPointWinner() != ModelPointWinner.ACT) {
            return true;
        }
        return !"".equals(getPointTotalMapRunnerUp(modelTotals));
    }

    public String getPathwayPointRunnerUp() {
        PathwayPointWinner runnerUp = PathwayPointWinner.fromCode(getPointTotalMapRunnerUp(pathwayTotals));
        return runnerUp.getArticle().toLowerCase() + " " + runnerUp.getName();
    }

    public String getWorkPointRunnerUp() {
        WorkPointWinner winner = WorkPointWinner.fromCode(getPointTotalMapWinner(workTotals));
        if (getPathwayPointWinner() != PathwayPointWinner.CRNA && isCRNAOnlyWork(winner)) {
            String runnerUpString = WorkPointWinner.fromCode(getPointTotalMapWinner(workTotals)).toString();
            if (PathwayPointWinner.fromCode(getPathwayPointRunnerUp()) != PathwayPointWinner.CRNA) {
                return runnerUpString + " (CRNA Only)";
            }
            return runnerUpString;
        }
        return WorkPointWinner.fromCode(getPointTotalMapRunnerUp(workTotals)).toString();
    }

    private boolean isCRNAOnlyWork(WorkPointWinner winner) {
        return winner == WorkPointWinner.EYE || winner == WorkPointWinner.KETAMINE;
    }

    public String getModelPointRunnerUp() {
        if (getPathwayPointWinner() == PathwayPointWinner.AA && getModelPointWinner() != ModelPointWinner.ACT) {
            return getModelPointWinner().toString();
        }
        return ModelPointWinner.fromCode(getPointTotalMapRunnerUp(modelTotals)).toString();
    }

    public String getWinningString() {
        PathwayPointWinner pathwayPointWinner = getPathwayPointWinner();
        WorkPointWinner workPointWinner = getWorkPointWinner();
        ModelPointWinner modelPointWinner = getModelPointWinner();

        StringBuilder sb = new StringBuilder(pathwayPointWinner.toString());
        sb.append(" in " + workPointWinner.toString());
        if (pathwayPointWinner != PathwayPointWinner.AA) {
            sb.append(" in " + modelPointWinner.toString());
        }

        return sb.toString();
    }

    private String getPointTotalMapWinner( Map<String, Integer> pointTotalMap) {
        return getPointTotalMapWinner(pointTotalMap, false);
    }

    private String getPointTotalMapRunnerUp( Map<String, Integer> pointTotalMap) {
        return getPointTotalMapWinner(pointTotalMap, true);
    }

    private String getPointTotalMapWinner( Map<String, Integer> pointTotalMap, boolean isGetRunnerUp) {
        String pointWinner = "";
        String pointRunnerUp = "";
        int pointWinnerAmount = 0;
        int pointRunnerUpAmount = 0;
        for (Map.Entry<String, Integer> pointKey : pointTotalMap.entrySet()) {
            String pointName = pointKey.getKey();
            Integer pointValue = pointKey.getValue();
            if (pointValue > pointWinnerAmount) {
                pointRunnerUp = pointWinner;
                pointRunnerUpAmount = pointWinnerAmount;
                pointWinner = pointName;
                pointWinnerAmount = pointValue;
            } else if (pointValue > pointRunnerUpAmount && pointValue > 0 && isGetRunnerUp) {
                pointRunnerUp = pointName;
                pointRunnerUpAmount = pointValue;
            }
        }

        return (isGetRunnerUp) ? pointRunnerUp : pointWinner;
    }

    public Map<String, Question> getQuestionData() {
        return questionData;
    }

    public void setQuestionData(Map<String, Question> questionData) {
        this.questionData = questionData;
    }

    public Map<String, Integer> getPathwayTotals() {
        return pathwayTotals;
    }

    public void setPathwayTotals(Map<String, Integer> pathwayTotals) {
        this.pathwayTotals = pathwayTotals;
    }

    public Map<String, Integer> getWorkTotals() {
        return workTotals;
    }

    public void setWorkTotals(Map<String, Integer> workTotals) {
        this.workTotals = workTotals;
    }

    public Map<String, Integer> getModelTotals() {
        return modelTotals;
    }

    public void setModelTotals(Map<String, Integer> modelTotals) {
        this.modelTotals = modelTotals;
    }

    public boolean isNeedsWork() {
        return isNeedsWork;
    }

    public void setNeedsWork(boolean needsWork) {
        isNeedsWork = needsWork;
    }
}
