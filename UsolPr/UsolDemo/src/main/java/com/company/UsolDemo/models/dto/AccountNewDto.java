package com.company.UsolDemo.models.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class AccountNewDto {
    private String userName;
    private String fullName;
    private String address;
    private String phone;
    private String email;
    private String accountRole;
    private int accountStatus;
}
