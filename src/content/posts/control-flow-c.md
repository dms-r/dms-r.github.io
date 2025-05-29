---
title: Control Flow in C
published: 2025-05-29
description: 'Learn control flow in c as boy'
image: ''
tags: [Syntax, Embedded]
category: 'Clang'
draft: false 
lang: ''
---

# Chapter 3 - Control Flow in C Programming

## Introduction to Control Flow

Control flow refers to the order in which individual statements, instructions, or function calls are executed in a program. Think of it like a roadmap that tells your computer which path to take based on different conditions.

---

## 3.1 Statements and Blocks

### What is a Statement?
A **statement** is a single instruction that tells the computer to do something. In C, statements end with a semicolon (`;`).

```c
printf("Hello World!");  // This is a statement
int x = 5;              // This is also a statement
```

### What is a Block?
A **block** is a group of statements enclosed in curly braces `{}`. Blocks are used to group related statements together.

```c
{
    int a = 10;
    int b = 20;
    printf("Sum = %d", a + b);
}  // This entire thing is a block
```

### Practical Example:
```c
#include <stdio.h>

int main() {
    // This is the main block
    {
        // This is a nested block
        int age = 16;
        printf("You are %d years old\n", age);
    }
    
    printf("End of program\n");
    return 0;
}
```

**Key Points:**
- Variables declared inside a block are only accessible within that block
- Blocks help organize code and control variable scope
- Every function body is a block

---

## 3.2 If-Else Statements

### The Basic If Statement
The `if` statement allows your program to make decisions. It's like asking a yes/no question.

**Syntax:**
```c
if (condition) {
    // Code to execute if condition is true
}
```

### Real-World Example:
```c
#include <stdio.h>

int main() {
    int age;
    
    printf("Enter your age: ");
    scanf("%d", &age);
    
    if (age >= 18) {
        printf("You can vote!\n");
    }
    
    return 0;
}
```

### If-Else Statement
Sometimes you want to do one thing if a condition is true, and something else if it's false.

**Syntax:**
```c
if (condition) {
    // Code if condition is true
} else {
    // Code if condition is false
}
```

### Example:
```c
#include <stdio.h>

int main() {
    int score;
    
    printf("Enter your test score: ");
    scanf("%d", &score);
    
    if (score >= 60) {
        printf("You passed! 🎉\n");
    } else {
        printf("You failed. Study harder! 📚\n");
    }
    
    return 0;
}
```

### Common Comparison Operators:
- `==` : Equal to
- `!=` : Not equal to
- `>` : Greater than
- `<` : Less than
- `>=` : Greater than or equal to
- `<=` : Less than or equal to

---

## 3.3 Else-If Statements

When you have multiple conditions to check, use `else if`. It's like having multiple questions in a chain.

**Syntax:**
```c
if (condition1) {
    // Code for condition1
} else if (condition2) {
    // Code for condition2
} else if (condition3) {
    // Code for condition3
} else {
    // Code if none of the above conditions are true
}
```

### Grade Calculator Example:
```c
#include <stdio.h>

int main() {
    int score;
    
    printf("Enter your score (0-100): ");
    scanf("%d", &score);
    
    if (score >= 90) {
        printf("Grade: A (Excellent!) ⭐\n");
    } else if (score >= 80) {
        printf("Grade: B (Good job!) 👍\n");
    } else if (score >= 70) {
        printf("Grade: C (Not bad!) 👌\n");
    } else if (score >= 60) {
        printf("Grade: D (You passed!) ✅\n");
    } else {
        printf("Grade: F (Better luck next time!) 😔\n");
    }
    
    return 0;
}
```

### Temperature Checker Example:
```c
#include <stdio.h>

int main() {
    float temp;
    
    printf("Enter temperature in Celsius: ");
    scanf("%f", &temp);
    
    if (temp > 35) {
        printf("It's very hot! Stay hydrated! 🌡️\n");
    } else if (temp > 25) {
        printf("Nice weather! Perfect for a walk! ☀️\n");
    } else if (temp > 10) {
        printf("A bit cool, wear a jacket! 🧥\n");
    } else {
        printf("It's cold! Bundle up! ❄️\n");
    }
    
    return 0;
}
```

---

## 3.4 Switch Statements

The `switch` statement is useful when you want to compare a variable against many possible values. It's like a multiple-choice question.

**Syntax:**
```c
switch (variable) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Code if no case matches
        break;
}
```

### Menu Selection Example:
```c
#include <stdio.h>

int main() {
    int choice;
    
    printf("=== SCHOOL CAFETERIA MENU ===\n");
    printf("1. Pizza 🍕\n");
    printf("2. Burger 🍔\n");
    printf("3. Salad 🥗\n");
    printf("4. Sandwich 🥪\n");
    printf("Enter your choice (1-4): ");
    
    scanf("%d", &choice);
    
    switch (choice) {
        case 1:
            printf("You ordered Pizza! That'll be $5.00\n");
            break;
        case 2:
            printf("You ordered a Burger! That'll be $4.50\n");
            break;
        case 3:
            printf("You ordered a Salad! That'll be $3.00\n");
            break;
        case 4:
            printf("You ordered a Sandwich! That'll be $3.50\n");
            break;
        default:
            printf("Invalid choice! Please select 1-4.\n");
            break;
    }
    
    return 0;
}
```

### Calculator Example:
```c
#include <stdio.h>

int main() {
    float num1, num2, result;
    char operator;
    
    printf("Enter first number: ");
    scanf("%f", &num1);
    
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);  // Note the space before %c
    
    printf("Enter second number: ");
    scanf("%f", &num2);
    
    switch (operator) {
        case '+':
            result = num1 + num2;
            printf("%.2f + %.2f = %.2f\n", num1, num2, result);
            break;
        case '-':
            result = num1 - num2;
            printf("%.2f - %.2f = %.2f\n", num1, num2, result);
            break;
        case '*':
            result = num1 * num2;
            printf("%.2f * %.2f = %.2f\n", num1, num2, result);
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
                printf("%.2f / %.2f = %.2f\n", num1, num2, result);
            } else {
                printf("Error: Cannot divide by zero!\n");
            }
            break;
        default:
            printf("Error: Invalid operator!\n");
            break;
    }
    
    return 0;
}
```

**Important Notes about Switch:**
- Always use `break;` after each case (unless you want fall-through behavior)
- The `default` case is optional but recommended
- Switch works with integers, characters, and enumerated types
- Cannot use ranges or complex conditions (use if-else for those)

---

## 3.5 Loops - While and For

Loops allow you to repeat code multiple times. It's like telling the computer "keep doing this until I tell you to stop."

### While Loop

The `while` loop continues as long as a condition remains true.

**Syntax:**
```c
while (condition) {
    // Code to repeat
}
```

### Counting Example:
```c
#include <stdio.h>

int main() {
    int count = 1;
    
    printf("Counting to 5:\n");
    while (count <= 5) {
        printf("%d\n", count);
        count++;  // Same as count = count + 1
    }
    
    printf("Done counting!\n");
    return 0;
}
```

### Password Checker Example:
```c
#include <stdio.h>
#include <string.h>

int main() {
    char password[20];
    char correct_password[] = "secret123";
    
    printf("Enter the password: ");
    scanf("%s", password);
    
    while (strcmp(password, correct_password) != 0) {
        printf("Wrong password! Try again: ");
        scanf("%s", password);
    }
    
    printf("Access granted! Welcome! 🔓\n");
    return 0;
}
```

### For Loop

The `for` loop is perfect when you know exactly how many times you want to repeat something.

**Syntax:**
```c
for (initialization; condition; update) {
    // Code to repeat
}
```

### Multiplication Table Example:
```c
#include <stdio.h>

int main() {
    int number;
    
    printf("Enter a number for multiplication table: ");
    scanf("%d", &number);
    
    printf("\nMultiplication table for %d:\n", number);
    printf("========================\n");
    
    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", number, i, number * i);
    }
    
    return 0;
}
```

### Sum Calculator Example:
```c
#include <stdio.h>

int main() {
    int n, sum = 0;
    
    printf("Enter how many numbers to add: ");
    scanf("%d", &n);
    
    printf("Enter %d numbers:\n", n);
    
    for (int i = 1; i <= n; i++) {
        int number;
        printf("Number %d: ", i);
        scanf("%d", &number);
        sum += number;  // Same as sum = sum + number
    }
    
    printf("The sum is: %d\n", sum);
    return 0;
}
```

### Pattern Printing Example:
```c
#include <stdio.h>

int main() {
    int rows;
    
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    
    printf("\nStar pattern:\n");
    
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\n");
    }
    
    return 0;
}
```

---

## 3.6 Loops - Do-While

The `do-while` loop is similar to `while`, but it guarantees the code runs at least once, even if the condition is false from the start.

**Syntax:**
```c
do {
    // Code to execute
} while (condition);
```

### Menu System Example:
```c
#include <stdio.h>

int main() {
    int choice;
    
    do {
        printf("\n=== STUDENT GRADE SYSTEM ===\n");
        printf("1. Add new grade\n");
        printf("2. View all grades\n");
        printf("3. Calculate average\n");
        printf("4. Exit\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Adding new grade...\n");
                break;
            case 2:
                printf("Viewing all grades...\n");
                break;
            case 3:
                printf("Calculating average...\n");
                break;
            case 4:
                printf("Goodbye! 👋\n");
                break;
            default:
                printf("Invalid choice! Please try again.\n");
                break;
        }
        
    } while (choice != 4);
    
    return 0;
}
```

### Input Validation Example:
```c
#include <stdio.h>

int main() {
    int age;
    
    do {
        printf("Enter your age (must be between 13 and 18): ");
        scanf("%d", &age);
        
        if (age < 13 || age > 18) {
            printf("Invalid age! You must be a high school student.\n");
        }
        
    } while (age < 13 || age > 18);
    
    printf("Great! You are %d years old and eligible!\n", age);
    return 0;
}
```

**When to use which loop:**
- **for**: When you know exactly how many times to loop
- **while**: When you don't know how many times, but you know the condition
- **do-while**: When you want to execute the code at least once

---

## 3.7 Break and Continue

These are special keywords that give you more control over your loops.

### Break Statement

`break` immediately exits the current loop.

```c
#include <stdio.h>

int main() {
    int number;
    
    printf("Enter numbers (enter 0 to stop):\n");
    
    for (int i = 1; i <= 10; i++) {
        printf("Number %d: ", i);
        scanf("%d", &number);
        
        if (number == 0) {
            printf("You entered 0. Stopping!\n");
            break;  // Exit the loop immediately
        }
        
        printf("You entered: %d\n", number);
    }
    
    printf("Program ended.\n");
    return 0;
}
```

### Continue Statement

`continue` skips the rest of the current iteration and goes to the next one.

```c
#include <stdio.h>

int main() {
    printf("Even numbers from 1 to 10:\n");
    
    for (int i = 1; i <= 10; i++) {
        if (i % 2 != 0) {  // If number is odd
            continue;  // Skip to next iteration
        }
        
        printf("%d ", i);
    }
    
    printf("\n");
    return 0;
}
```

### Search Example with Break:
```c
#include <stdio.h>

int main() {
    int numbers[] = {23, 45, 67, 12, 89, 34, 56};
    int search_number, found = 0;
    int size = 7;
    
    printf("Numbers in array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    
    printf("\nEnter number to search: ");
    scanf("%d", &search_number);
    
    for (int i = 0; i < size; i++) {
        if (numbers[i] == search_number) {
            printf("Found %d at position %d!\n", search_number, i + 1);
            found = 1;
            break;  // Stop searching once found
        }
    }
    
    if (!found) {
        printf("Number %d not found in the array.\n", search_number);
    }
    
    return 0;
}
```

### Skip Negative Numbers Example:
```c
#include <stdio.h>

int main() {
    int sum = 0, count = 0;
    
    printf("Enter 5 numbers (negative numbers will be ignored):\n");
    
    for (int i = 1; i <= 5; i++) {
        int number;
        printf("Number %d: ", i);
        scanf("%d", &number);
        
        if (number < 0) {
            printf("Negative number ignored!\n");
            continue;  // Skip this iteration
        }
        
        sum += number;
        count++;
    }
    
    if (count > 0) {
        printf("Sum of positive numbers: %d\n", sum);
        printf("Average: %.2f\n", (float)sum / count);
    } else {
        printf("No positive numbers entered!\n");
    }
    
    return 0;
}
```

---

## 3.8 Goto and Labels

**Important:** While `goto` exists in C, it's generally discouraged in modern programming because it can make code hard to read and debug. However, you should know it exists.

### Syntax:
```c
goto label_name;

label_name:
    // Code here
```

### Example (NOT recommended style):
```c
#include <stdio.h>

int main() {
    int number;
    
    start:  // This is a label
    printf("Enter a positive number: ");
    scanf("%d", &number);
    
    if (number <= 0) {
        printf("That's not positive! Try again.\n");
        goto start;  // Jump back to the start label
    }
    
    printf("Thank you! You entered: %d\n", number);
    return 0;
}
```

### Better Alternative (using loops):
```c
#include <stdio.h>

int main() {
    int number;
    
    do {
        printf("Enter a positive number: ");
        scanf("%d", &number);
        
        if (number <= 0) {
            printf("That's not positive! Try again.\n");
        }
    } while (number <= 0);
    
    printf("Thank you! You entered: %d\n", number);
    return 0;
}
```

**Why avoid goto?**
- Makes code harder to understand
- Can create "spaghetti code" (code that jumps around unpredictably)
- Loops and functions provide better structure
- Modern programming emphasizes structured programming

---

## Summary

Control flow structures are the backbone of programming logic:

1. **Statements and Blocks**: Basic building blocks of code organization
2. **If-Else**: Make simple decisions
3. **Else-If**: Handle multiple conditions
4. **Switch**: Efficient multi-choice selection
5. **Loops**: Repeat code efficiently
   - **For**: When you know the count
   - **While**: When you know the condition
   - **Do-While**: When you need at least one execution
6. **Break/Continue**: Fine-tune loop behavior
7. **Goto**: Exists but avoid using it
