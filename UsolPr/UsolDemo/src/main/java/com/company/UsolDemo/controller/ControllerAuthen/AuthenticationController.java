package com.company.UsolDemo.controller.ControllerAuthen;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/registerad")
    public ResponseEntity<AuthenticationResponse> registerad(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.registerad(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/authenticatead")
    public ResponseEntity<AuthenticationResponse> authenticatead(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/authenticate1")
    public ResponseEntity<AuthenticatonResponse1> authenticate1(@RequestBody AuthenticationRequest request) {
        AuthenticatonResponse1 respone1= service.authenticate1(request);
        return ResponseEntity.ok(respone1);
    }
}
