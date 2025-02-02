package com.github.dm0896665.pre_anesthesia.controller;

import com.github.dm0896665.pre_anesthesia.model.Education;
import com.github.dm0896665.pre_anesthesia.model.ResultFormSubmission;
import com.github.dm0896665.pre_anesthesia.model.State;
import com.github.dm0896665.pre_anesthesia.service.IResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ApplicationController {

    @Autowired
    IResultService resultService;

    @GetMapping("/")
    public String getHome(Model model) {
        return "index";
    }

//    @RequestMapping(value = "/results/add", method = RequestMethod.POST,
//            consumes = "application/json")
//    @ResponseBody
    @RequestMapping(value = "/results/add", method = RequestMethod.POST)
    public String addResult(@ModelAttribute final ResultFormSubmission submission) {

        int id = resultService.addResult(submission.toResult());
        return "redirect:/results/" + id;
    }

    @GetMapping("/results/{resultNumber}")
    public String getResult(@PathVariable("resultNumber") Integer resultID, Model model) {
        model.addAttribute("result", resultService.getResult(resultID));
        return "viewResult";
    }

    @GetMapping("/quiz")
    public String getQuiz(Model model) {
        model.addAttribute("educations", Education.values());
        model.addAttribute("states", State.values());
        return "quiz";
    }

    @GetMapping("/error")
    public String getError(Model model) {
        return "error";
    }

}
