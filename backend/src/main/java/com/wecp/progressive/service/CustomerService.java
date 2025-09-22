package com.wecp.progressive.service;


import com.wecp.progressive.entity.Customers;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface CustomerService {
    List<Customers> getAllCustomers() throws SQLException;
    int addCustomer(Customers customers) throws SQLException;
    List<Customers> getAllCustomersSortedByName() throws SQLException;
    default public void emptyArrayList() {}

    //Do not implement these methods in CustomerServiceImplArraylist.java class
    default void updateCustomer(Customers customers) throws SQLException {}
     boolean deleteCustomer(Integer customerId) throws SQLException;
    default Customers getCustomerById(Integer customerId) throws SQLException {
        return null;
    }

}