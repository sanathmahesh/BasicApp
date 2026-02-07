package com.expensecalc.repository;

import com.expensecalc.entity.BudgetLimit;
import com.expensecalc.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetLimitRepository extends JpaRepository<BudgetLimit, Long> {

    Optional<BudgetLimit> findByCategoryAndMonthAndYear(
        Category category, Integer month, Integer year);

    List<BudgetLimit> findByMonthAndYear(Integer month, Integer year);
}
