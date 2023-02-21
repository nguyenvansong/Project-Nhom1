package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Account;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private Long accountID;
    private String password;
    private String userName;
    private String fullName;
    private String address;
    private String phone;
    private String email;
    private MultipartFile accountImage;
    private int accountRole;
    private int accountStatus;

    public AccountDto(String userName, String fullName, String address, String phone, String email, MultipartFile accountImage) {
        this.userName = userName;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountImage = accountImage;
    }

    public AccountDto(String password, String userName, String fullName, String address, String phone, String email, MultipartFile accountImage, int accountRole, int accountStatus) {
        this.password = password;
        this.userName = userName;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountImage = accountImage;
        this.accountRole = accountRole;
        this.accountStatus = accountStatus;
    }

    public AccountDto(String password, String userName, String fullName, String address, String phone, String email, int accountRole, int accountStatus) {
        this.password = password;
        this.userName = userName;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountRole = accountRole;
        this.accountStatus = accountStatus;
    }
}
