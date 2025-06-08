package com.github.dm0896665.pre_anesthesia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dm0896665.pre_anesthesia.model.quiz.QuizResult;
import com.github.dm0896665.pre_anesthesia.service.IResultService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Controller
public class ApplicationController {

    @Autowired
    IResultService resultService;

    @GetMapping("/")
    public String getHome(Model model) {
        return "index";
    }

//    @RequestMapping(value = "/results/add", method = RequestMethod.POST)
//    public String addResult(@ModelAttribute final ResultFormSubmission submission) {
//
//        int id = resultService.addResult(submission.toResult());
//        return "redirect:/results/" + id;
//    }
//
//    @GetMapping("/results/{resultnumber}")
//    public String getResult(@PathVariable("resultnumber") Integer resultID, Model model) {
//        model.addAttribute("result", resultService.getResult(resultID));
//        return "viewResult";
//    }

    @GetMapping("/questions")
    public ResponseEntity<Map<String, Object>> getFinancialTotalsMap(Model model) {
        ClassPathResource resource = new ClassPathResource("static/json/questions.json");
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

    @GetMapping("/quiz")
    public String getQuiz(Model model) {
        return "quiz";
    }

    @GetMapping("/quiz/results")
    public String showResults(HttpServletRequest request, Model model) {
        Map<String, ?> inputFlashMap = RequestContextUtils.getInputFlashMap(request);
        QuizResult results = (QuizResult) inputFlashMap.get("results");
        model.addAttribute("results", results);

        return "results";
    }
    @PostMapping(path = "/quiz/results")
    public RedirectView paymentVerification(HttpServletRequest request, RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("results", resultService.getQuizResultFromJson(request.getParameter("results")));
        return new RedirectView("/quiz/results", true);
    }

//    @RequestMapping(
//            value = "/quiz/results",
//            method = RequestMethod.POST)
//    public void getResults(@RequestBody Map<String, Object> payload)
//            throws Exception {
//
//        System.out.println(payload);
//    }

    @GetMapping("/error")
    public String getError(Model model) {
        return "error";
    }

}
