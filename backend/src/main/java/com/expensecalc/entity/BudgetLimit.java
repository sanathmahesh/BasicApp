package com.expensecalc.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "budget_limits", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"category", "month", "year"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Category category;

    @NotNull
    @DecimalMin(value = "0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal limitAmount;

    @NotNull
    @Min(1) @Max(12)
    @Column(nullable = false)
    private Integer month;

    @NotNull
    @Min(2000)
    @Column(nullable = false)
    private Integer year;
}
