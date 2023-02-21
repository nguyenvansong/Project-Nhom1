package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    public Optional<Account> findByEmail(String email);
    @Procedure("proc_DeleteAccount")
    public void DeleteAccount(@Param("id") long id);
    @Procedure("get_getAccountId")
    public List<Object[]> findByIDAcc(@Param("id") long id);
}
