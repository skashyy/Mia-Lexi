package com.csds393.mialexi.controller;

import java.util.Random;

import javax.xml.stream.events.EndElement;

import com.csds393.mialexi.model.PracticeFile;
import com.csds393.mialexi.repository.PracticeFileJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;




@RestController
@CrossOrigin
@RequestMapping("/PracticeFile")
public class PracticeFileController {


    @GetMapping(value = "/")
    public String index() {
        return "index";
    }
	/** The JPA repository */
    @Autowired
    
    private PracticeFileJpaRepository PracticeFileJpaRepository;

    

    @GetMapping(value = "/get")
    public String getTextFiles(){
        Random random = new Random();
        int index = random.nextInt(PracticeFileJpaRepository.findAll().size());
        String practiceFiles = PracticeFileJpaRepository.findByIndex(index).getFileContent();
        return practiceFiles;
    }

    @PostMapping(value = "/add")
    public boolean addPracticeFile(@RequestBody final PracticeFile practiceFile){
        practiceFile.setIndex(PracticeFileJpaRepository.findAll().size());
        PracticeFileJpaRepository.save(practiceFile);
        return true;
    }
}
