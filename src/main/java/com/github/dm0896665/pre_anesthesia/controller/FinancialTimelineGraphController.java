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
@RequestMapping("/financialTimelineGraph")
public class FinancialTimelineGraphController {

    @GetMapping("/financialMap")
    public ResponseEntity<Map<String, Object>> getFinancialMap(Model model) {
        ClassPathResource resource = new ClassPathResource("static/json/financial_timeline_graph/financialMap.json");
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
        ClassPathResource resource = new ClassPathResource("static/json/financial_timeline_graph/financialTotalsMap.json");
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
        ClassPathResource resource = new ClassPathResource("static/json/financial_timeline_graph/financialGraphData.json");
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
        ClassPathResource resource = new ClassPathResource("static/json/financial_timeline_graph/careerTimelineData.json");
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
