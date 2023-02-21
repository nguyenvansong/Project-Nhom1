package com.company.UsolDemo.controller.ControllerAuthen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String userName;

    private String fullName;
    private String password;

    private String address;

    private String phone;

    private String email;
}
