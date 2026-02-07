package com.expensecalc.service;

import com.expensecalc.dto.ExpenseRequest;
import com.expensecalc.dto.ExpenseResponse;
import com.expensecalc.entity.Category;
import com.expensecalc.entity.Expense;
import com.expensecalc.exception.ResourceNotFoundException;
import com.expensecalc.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public List<ExpenseResponse> getAllExpenses() {
        return expenseRepository.findAllByOrderByDateDescCreatedAtDesc()
            .stream().map(this::toResponse).toList();
    }

    public ExpenseResponse getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        return toResponse(expense);
    }

    public ExpenseResponse createExpense(ExpenseRequest request) {
        Expense expense = Expense.builder()
            .title(request.title())
            .description(request.description())
            .amount(request.amount())
            .category(request.category())
            .date(request.date())
            .build();
        return toResponse(expenseRepository.save(expense));
    }

    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        expense.setTitle(request.title());
        expense.setDescription(request.description());
        expense.setAmount(request.amount());
        expense.setCategory(request.category());
        expense.setDate(request.date());
        return toResponse(expenseRepository.save(expense));
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }

    public List<ExpenseResponse> filterExpenses(Category category, LocalDate startDate, LocalDate endDate) {
        List<Expense> expenses;
        if (category != null && startDate != null && endDate != null) {
            expenses = expenseRepository.findByCategoryAndDateBetweenOrderByDateDesc(category, startDate, endDate);
        } else if (category != null) {
            expenses = expenseRepository.findByCategoryOrderByDateDesc(category);
        } else if (startDate != null && endDate != null) {
            expenses = expenseRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
        } else {
            expenses = expenseRepository.findAllByOrderByDateDescCreatedAtDesc();
        }
        return expenses.stream().map(this::toResponse).toList();
    }

    private ExpenseResponse toResponse(Expense expense) {
        return new ExpenseResponse(
            expense.getId(),
            expense.getTitle(),
            expense.getDescription(),
            expense.getAmount(),
            expense.getCategory(),
            expense.getDate(),
            expense.getCreatedAt(),
            expense.getUpdatedAt()
        );
    }
}
