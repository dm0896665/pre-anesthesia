package com.github.dm0896665.pre_anesthesia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

}
