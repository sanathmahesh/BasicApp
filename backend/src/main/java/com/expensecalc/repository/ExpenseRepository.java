package com.expensecalc.repository;

import com.expensecalc.entity.Category;
import com.expensecalc.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);

    List<Expense> findByCategoryOrderByDateDesc(Category category);

    List<Expense> findByCategoryAndDateBetweenOrderByDateDesc(
        Category category, LocalDate startDate, LocalDate endDate);

    List<Expense> findAllByOrderByDateDescCreatedAtDesc();

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e " +
           "WHERE e.category = :category " +
           "AND MONTH(e.date) = :month AND YEAR(e.date) = :year")
    BigDecimal sumByCategoryAndMonth(
        @Param("category") Category category,
        @Param("month") int month,
        @Param("year") int year);

    @Query("SELECT e.category, COALESCE(SUM(e.amount), 0) FROM Expense e " +
           "WHERE MONTH(e.date) = :month AND YEAR(e.date) = :year " +
           "GROUP BY e.category")
    List<Object[]> sumByMonthGroupedByCategory(
        @Param("month") int month, @Param("year") int year);

    @Query("SELECT MONTH(e.date) as m, COALESCE(SUM(e.amount), 0) " +
           "FROM Expense e WHERE YEAR(e.date) = :year " +
           "GROUP BY MONTH(e.date) ORDER BY MONTH(e.date)")
    List<Object[]> monthlyTotalsForYear(@Param("year") int year);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e " +
           "WHERE MONTH(e.date) = :month AND YEAR(e.date) = :year")
    BigDecimal sumByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE YEAR(e.date) = :year")
    BigDecimal sumByYear(@Param("year") int year);

    @Query("SELECT COUNT(e) FROM Expense e WHERE MONTH(e.date) = :month AND YEAR(e.date) = :year")
    long countByMonthAndYear(@Param("month") int month, @Param("year") int year);

    List<Expense> findTop5ByOrderByDateDescCreatedAtDesc();
}
