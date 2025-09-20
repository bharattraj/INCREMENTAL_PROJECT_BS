package com.wecp.progressive.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wecp.progressive.entity.Accounts;
@Repository
public interface AccountRepository extends JpaRepository<Accounts, Integer> {
    
   
    @Query("SELECT a FROM Accounts a WHERE a.customer.customerId = :customerId")
    List<Accounts> getAccountsByCustomerCustomerId(@Param("customerId") Integer customerId);
    
    
    @Query("")
    Accounts findByAccountId(Integer accountId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Accounts acc WHERE acc.customer.customerId = :customerId")
    void deleteByCustomerId(Integer customerId);
}