package com.github.dm0896665.pre_anesthesia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Controller
@RequestMapping("/careerpathways")
public class CareerPathwaysController {

    @GetMapping("/")
    public String getCareerPathways(Model model) {
        return getDefault(model);
    }

    @GetMapping("/default")
    public String getDefault(Model model) {
        return "subpage/career_pathways/careerPathways";
    }

    @GetMapping("/anesthesiologist")
    public String getAnesthesiologist(Model model) {
        return "subpage/career_pathways/anesthesiologist";
    }

    @GetMapping("/aa")
    public String getAa(Model model) {
        return "subpage/career_pathways/aa";
    }

    @GetMapping("/crna")
    public String getCrna(Model model) {
        return "subpage/career_pathways/crna";
    }

    @GetMapping("/compare")
    public String getCompare(Model model) {
        return "subpage/career_pathways/compare";
    }

    @GetMapping("/financialMap")
    public ResponseEntity<Map<String, Object>> getFinancialMap(Model model) {
        ClassPathResource resource = new ClassPathResource("static/json/subpage/career_pathways/financialMap.json");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> data = objectMapper.readValue(inputStream, Map.class);
            inputStream.close();
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (IOException e) {
            return null;
        }
    }

    @GetMapping("/financialTotalsMap")
    public ResponseEntity<Map<String, Object>> getFinancialTotalsMap(Model model) {
        ClassPathResource resource = new ClassPathResource("static/json/subpage/career_pathways/financialTotalsMap.json");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> data = objectMapper.readValue(inputStream, Map.class);
            inputStream.close();
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (IOException e) {
            return null;
        }
    }

    @GetMapping("/financialGraphData")
    public ResponseEntity<Map<String, Object>> getFinancialGraphData(Model model) {
        ClassPathResource resource = new ClassPathResource("static/json/subpage/career_pathways/financialGraphData.json");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> data = objectMapper.readValue(inputStream, Map.class);
            inputStream.close();
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (IOException e) {
            return null;
        }
    }

    @GetMapping("/careerTimelineData")
    public ResponseEntity<Map<String, Object>> getcareerTimelineData(Model model) {
        ClassPathResource resource = new ClassPathResource("static/json/subpage/career_pathways/careerTimelineData.json");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> data = objectMapper.readValue(inputStream, Map.class);
            inputStream.close();
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (IOException e) {
            return null;
        }
    }

}
