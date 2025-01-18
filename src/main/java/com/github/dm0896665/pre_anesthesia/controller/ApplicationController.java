package com.github.dm0896665.pre_anesthesia.controller;

import com.github.dm0896665.pre_anesthesia.model.Education;
import com.github.dm0896665.pre_anesthesia.model.Result;
import com.github.dm0896665.pre_anesthesia.model.ResultFormSubmission;
import com.github.dm0896665.pre_anesthesia.model.State;
import com.github.dm0896665.pre_anesthesia.service.IResultService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class ApplicationController {

    @Autowired
    IResultService resultService;

    @GetMapping("/")
    public String getHome(Model model) {
        String welcomeMessage = "Welcome to the web peasant";
        model.addAttribute("message", welcomeMessage);
        model.addAttribute("educations", Education.values());
        model.addAttribute("states", State.values());
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

    @GetMapping("/questionnaire")
    public String getUsers(Model model) {
//        List<User> users = Stream
//                .of(new User(1, "John", "USA"), new User(2, "Pitter", "IND"), new User(3, "Washim", "PAK"))
//                .collect(Collectors.toList());
//        model.addAttribute("users", users);
        return "userList";

    }

}
