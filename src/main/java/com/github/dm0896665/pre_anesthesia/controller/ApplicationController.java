package com.github.dm0896665.pre_anesthesia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ApplicationController {

//    @Autowired
//    IResultService resultService;

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
