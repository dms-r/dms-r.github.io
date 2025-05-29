---
title: Chapter 2 - Learn C
published: 2025-05-29
description: 'Types, operators and expressions in c'
image: ''
tags: [Syntax, Embedded]
category: 'Clang'
draft: false 
lang: 'en'
---

## Learning Objectives
By the end of this chapter, you will be able to:
- Understand different data types in C
- Create and use variables with proper naming conventions
- Perform arithmetic and logical operations
- Convert between different data types
- Write complex expressions using operators
- Understand operator precedence and evaluation order

---

## 2.1 Variable Names

### What is a Variable?
A variable is like a container that stores data in your computer's memory. Think of it as a labeled box where you can put different types of information.

### Variable Naming Rules
1. **Must start with**: letter (a-z, A-Z) or underscore (_)
2. **Can contain**: letters, digits (0-9), and underscores
3. **Cannot contain**: spaces, special characters (@, #, $, etc.)
4. **Case sensitive**: `age` and `Age` are different variables
5. **Cannot use**: C keywords (like `int`, `if`, `while`)

### Good Variable Names Examples
```c
int studentAge;        // Descriptive and clear
float averageScore;    // Uses camelCase
int total_marks;       // Uses snake_case
char first_name[20];   // Clear purpose
```

### Bad Variable Names Examples
```c
int a;           // Too short, unclear meaning
int 2numbers;    // Starts with digit (ERROR!)
float avg@score; // Contains special character (ERROR!)
int class;       // Uses C keyword (ERROR!)
```

### Naming Conventions
- **camelCase**: `firstName`, `studentAge`
- **snake_case**: `first_name`, `student_age`
- Choose one style and be consistent!

---

## 2.2 Data Types and Sizes

### Why Do We Need Data Types?
Data types tell the computer:
- How much memory to allocate
- How to interpret the stored data
- What operations are allowed

### Basic Data Types

#### 1. Integer Types (`int`)
Stores whole numbers (positive, negative, or zero)

```c
int age = 17;
int temperature = -5;
int score = 0;
```

**Size**: Usually 4 bytes (32 bits)
**Range**: -2,147,483,648 to 2,147,483,647

#### 2. Character Type (`char`)
Stores single characters

```c
char grade = 'A';
char initial = 'J';
char symbol = '$';
```

**Size**: 1 byte (8 bits)
**Range**: -128 to 127 (or 0 to 255 if unsigned)

#### 3. Floating Point Types

**Float (`float`)**: Single precision decimal numbers
```c
float height = 5.8;
float pi = 3.14159;
```
**Size**: 4 bytes, **Precision**: ~6-7 decimal digits

**Double (`double`)**: Double precision decimal numbers
```c
double precise_pi = 3.141592653589793;
double distance = 384400.5;
```
**Size**: 8 bytes, **Precision**: ~15-16 decimal digits

#### 4. Modified Data Types

**Short**: Smaller integer
```c
short small_number = 1000;
```

**Long**: Larger integer
```c
long big_number = 1234567890L;
```

**Unsigned**: Only positive numbers
```c
unsigned int positive_only = 50000;
```

### Size Comparison Table
| Type | Size (bytes) | Range |
|------|-------------|-------|
| char | 1 | -128 to 127 |
| short | 2 | -32,768 to 32,767 |
| int | 4 | -2.1 billion to 2.1 billion |
| long | 8 | Very large range |
| float | 4 | ±3.4E±38 (6-7 digits) |
| double | 8 | ±1.7E±308 (15-16 digits) |

---

## 2.3 Constants

### What are Constants?
Constants are values that never change during program execution. Like mathematical constants (π = 3.14159).

### Types of Constants

#### 1. Literal Constants
Direct values written in code:

```c
int students = 30;        // 30 is an integer literal
float pi = 3.14159;       // 3.14159 is a float literal
char grade = 'A';         // 'A' is a character literal
```

#### 2. Named Constants (using `#define`)
```c
#define PI 3.14159
#define MAX_STUDENTS 50
#define PASSING_GRADE 'C'

// Usage
float area = PI * radius * radius;
int class_size = MAX_STUDENTS;
```

#### 3. Const Keyword
```c
const int DAYS_IN_WEEK = 7;
const float GRAVITY = 9.81;

// DAYS_IN_WEEK = 8;  // ERROR! Cannot change const value
```

### When to Use Constants?
- Mathematical values (π, e)
- Configuration values (max array size)
- Values that shouldn't change accidentally

---

## 2.4 Declarations

### What is a Declaration?
A declaration tells the compiler:
- The name of a variable
- Its data type
- How much memory to reserve

### Basic Declaration Syntax
```c
data_type variable_name;
```

### Examples of Declarations
```c
// Single declarations
int age;
float height;
char grade;

// Multiple declarations of same type
int length, width, area;
float price, tax, total;

// Declaration with initialization
int students = 25;
float temperature = 36.5;
char letter = 'X';
```

### Declaration Rules
1. **Declare before use**: Must declare variable before using it
2. **One declaration per variable**: Cannot declare same variable twice
3. **Scope matters**: Where you declare affects where you can use it

```c
#include <stdio.h>

int main() {
    // Correct: Declare then use
    int number;
    number = 10;
    printf("Number: %d", number);
    
    // Correct: Declare and initialize together
    int age = 17;
    printf("Age: %d", age);
    
    return 0;
}
```

---

## 2.5 Arithmetic Operators

### Basic Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|---------|
| + | Addition | 5 + 3 | 8 |
| - | Subtraction | 10 - 4 | 6 |
| * | Multiplication | 6 * 7 | 42 |
| / | Division | 15 / 3 | 5 |
| % | Modulus (Remainder) | 17 % 5 | 2 |

### Practical Examples
```c
#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    printf("Addition: %d + %d = %d\n", a, b, a + b);      // 13
    printf("Subtraction: %d - %d = %d\n", a, b, a - b);   // 7
    printf("Multiplication: %d * %d = %d\n", a, b, a * b); // 30
    printf("Division: %d / %d = %d\n", a, b, a / b);       // 3
    printf("Modulus: %d %% %d = %d\n", a, b, a % b);       // 1
    
    return 0;
}
```

### Important Notes about Division

#### Integer Division
```c
int result = 7 / 2;  // Result is 3, not 3.5!
```
When both operands are integers, result is integer (decimal part truncated).

#### Float Division
```c
float result = 7.0 / 2.0;  // Result is 3.5
float result2 = 7 / 2.0;   // Result is 3.5 (mixed types)
```

### Modulus Operator (%)
- Only works with integers
- Returns remainder after division
- Useful for checking if number is even/odd

```c
int number = 17;
if (number % 2 == 0) {
    printf("Even number");
} else {
    printf("Odd number");  // This will execute
}
```

---

## 2.6 Relational and Logical Operators

### Relational Operators
Compare two values and return true (1) or false (0).

| Operator | Name | Example | Result |
|----------|------|---------|---------|
| == | Equal to | 5 == 5 | 1 (true) |
| != | Not equal to | 5 != 3 | 1 (true) |
| > | Greater than | 8 > 5 | 1 (true) |
| < | Less than | 3 < 7 | 1 (true) |
| >= | Greater than or equal | 5 >= 5 | 1 (true) |
| <= | Less than or equal | 4 <= 6 | 1 (true) |

### Logical Operators
Combine multiple conditions.

| Operator | Name | Symbol | Truth Table |
|----------|------|--------|-------------|
| && | AND | A && B | True only if both A and B are true |
| \|\| | OR | A \|\| B | True if either A or B is true |
| ! | NOT | !A | True if A is false, false if A is true |

### Practical Examples
```c
#include <stdio.h>

int main() {
    int age = 17;
    int grade = 85;
    
    // Relational operators
    printf("Is age >= 18? %d\n", age >= 18);  // 0 (false)
    printf("Is grade > 80? %d\n", grade > 80); // 1 (true)
    
    // Logical operators
    if (age >= 16 && grade >= 70) {
        printf("Eligible for advanced course\n");
    }
    
    if (age < 18 || grade < 60) {
        printf("Special requirements apply\n");
    }
    
    if (!(age >= 18)) {
        printf("Minor student\n");
    }
    
    return 0;
}
```

### Truth Tables

**AND (&&) Operator**
| A | B | A && B |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**OR (||) Operator**
| A | B | A \|\| B |
|---|---|----------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

---

## 2.7 Type Conversions

### What is Type Conversion?
Converting data from one type to another. Like converting temperature from Celsius to Fahrenheit.

### Types of Conversion

#### 1. Implicit Conversion (Automatic)
Compiler automatically converts smaller type to larger type.

```c
int whole = 5;
float decimal = 2.5;
float result = whole + decimal;  // int 5 becomes float 5.0
printf("Result: %.1f", result);  // Output: 7.5
```

**Conversion Hierarchy** (smaller to larger):
```
char → short → int → long → float → double
```

#### 2. Explicit Conversion (Type Casting)
Programmer forces conversion using cast operator.

```c
float average = (float)(total_marks) / number_of_subjects;
int rounded = (int)(3.7);  // Result: 3 (truncated)
char letter = (char)(65);  // Result: 'A'
```

### Practical Examples
```c
#include <stdio.h>

int main() {
    // Implicit conversion examples
    int a = 10;
    float b = 3.5;
    float result1 = a + b;  // a becomes 10.0
    printf("10 + 3.5 = %.1f\n", result1);  // 13.5
    
    // Explicit conversion examples
    float pi = 3.14159;
    int whole_pi = (int)pi;  // Explicit cast
    printf("Pi as integer: %d\n", whole_pi);  // 3
    
    // Division with casting
    int marks1 = 85, marks2 = 90, marks3 = 78;
    float average = (float)(marks1 + marks2 + marks3) / 3;
    printf("Average: %.2f\n", average);  // 84.33
    
    return 0;
}
```

### Common Conversion Pitfalls
```c
// Problem: Integer division
int result = 7 / 2;  // Result: 3 (not 3.5!)

// Solution: Cast to float
float correct_result = (float)7 / 2;  // Result: 3.5
```

---

## 2.8 Increment and Decrement Operators

### Basic Operators
| Operator | Name | Effect |
|----------|------|--------|
| ++ | Increment | Increases value by 1 |
| -- | Decrement | Decreases value by 1 |

### Two Forms

#### 1. Pre-increment/decrement (++var, --var)
Increment/decrement first, then use the value.

```c
int a = 5;
int b = ++a;  // a becomes 6, then b gets 6
printf("a = %d, b = %d", a, b);  // a = 6, b = 6
```

#### 2. Post-increment/decrement (var++, var--)
Use the value first, then increment/decrement.

```c
int x = 5;
int y = x++;  // y gets 5, then x becomes 6
printf("x = %d, y = %d", x, y);  // x = 6, y = 5
```

### Practical Examples
```c
#include <stdio.h>

int main() {
    int counter = 0;
    
    printf("Initial counter: %d\n", counter);
    
    // Post-increment
    printf("Using post-increment: %d\n", counter++);  // Prints 0
    printf("Counter after post-increment: %d\n", counter);  // Prints 1
    
    // Pre-increment
    printf("Using pre-increment: %d\n", ++counter);  // Prints 2
    printf("Counter after pre-increment: %d\n", counter);  // Prints 2
    
    // Common usage in loops
    for (int i = 1; i <= 5; i++) {  // Post-increment
        printf("Loop iteration: %d\n", i);
    }
    
    return 0;
}
```

### When to Use Which?
- **In loops**: Usually doesn't matter (`for (int i = 0; i < 10; i++)`)
- **In assignments**: Choose based on whether you need old or new value
- **Keep it simple**: Use the form that makes your intent clear

---

## 2.9 Bitwise Operators

### What are Bitwise Operators?
Operators that work on individual bits (0s and 1s) of numbers. Useful for low-level programming and optimization.

### Binary Number Review
```
Decimal: 5 → Binary: 101
Decimal: 3 → Binary: 011
```

### Bitwise Operators

| Operator | Name | Example | Binary Operation |
|----------|------|---------|------------------|
| & | AND | 5 & 3 | 101 & 011 = 001 (1) |
| \| | OR | 5 \| 3 | 101 \| 011 = 111 (7) |
| ^ | XOR | 5 ^ 3 | 101 ^ 011 = 110 (6) |
| ~ | NOT | ~5 | ~101 = ...11111010 |
| << | Left Shift | 5 << 1 | 101 → 1010 (10) |
| >> | Right Shift | 5 >> 1 | 101 → 10 (2) |

### Practical Examples
```c
#include <stdio.h>

int main() {
    int a = 5;  // Binary: 101
    int b = 3;  // Binary: 011
    
    printf("a = %d (binary: 101)\n", a);
    printf("b = %d (binary: 011)\n", b);
    printf("\n");
    
    printf("a & b = %d\n", a & b);   // AND: 1
    printf("a | b = %d\n", a | b);   // OR: 7
    printf("a ^ b = %d\n", a ^ b);   // XOR: 6
    printf("~a = %d\n", ~a);         // NOT: -6
    printf("a << 1 = %d\n", a << 1); // Left shift: 10
    printf("a >> 1 = %d\n", a >> 1); // Right shift: 2
    
    return 0;
}
```

### Common Uses
1. **Checking if number is even/odd**:
   ```c
   if (number & 1) {
       printf("Odd");
   } else {
       printf("Even");
   }
   ```

2. **Multiplying/dividing by powers of 2**:
   ```c
   int double_value = number << 1;  // Multiply by 2
   int half_value = number >> 1;    // Divide by 2
   ```

3. **Setting/clearing bits** (advanced topic for later)

---

## 2.10 Assignment Operators and Expressions

### Basic Assignment Operator (=)
```c
int age = 17;        // Assigns 17 to age
float height = 5.8;  // Assigns 5.8 to height
```

### Compound Assignment Operators
Shorthand for common operations:

| Operator | Meaning | Example | Equivalent |
|----------|---------|---------|------------|
| += | Add and assign | a += 5 | a = a + 5 |
| -= | Subtract and assign | a -= 3 | a = a - 3 |
| *= | Multiply and assign | a *= 2 | a = a * 2 |
| /= | Divide and assign | a /= 4 | a = a / 4 |
| %= | Modulus and assign | a %= 3 | a = a % 3 |

### Examples
```c
#include <stdio.h>

int main() {
    int score = 100;
    
    printf("Initial score: %d\n", score);
    
    score += 20;  // Add 20 points
    printf("After bonus: %d\n", score);      // 120
    
    score -= 15;  // Lose 15 points
    printf("After penalty: %d\n", score);    // 105
    
    score *= 2;   // Double the score
    printf("After doubling: %d\n", score);  // 210
    
    score /= 3;   // Divide by 3
    printf("After division: %d\n", score);  // 70
    
    score %= 8;   // Get remainder when divided by 8
    printf("Final score: %d\n", score);     // 6
    
    return 0;
}
```

### Multiple Assignments
```c
int a, b, c;
a = b = c = 10;  // All variables get value 10
```

### Assignment in Expressions
Assignment returns the assigned value:
```c
int x, y;
if ((x = 5) > 3) {  // x gets 5, then compare with 3
    printf("x is %d and greater than 3", x);
}
```

---

## 2.11 Conditional Expressions

### Ternary Operator (?:)
A shorthand for simple if-else statements.

**Syntax**: `condition ? value_if_true : value_if_false`

### Basic Examples
```c
int age = 17;
char *status = (age >= 18) ? "Adult" : "Minor";
printf("Status: %s", status);  // Output: Minor

int a = 10, b = 20;
int max = (a > b) ? a : b;
printf("Maximum: %d", max);    // Output: 20
```

### Comparison with if-else
```c
// Using ternary operator
int absolute = (number < 0) ? -number : number;

// Equivalent if-else
int absolute;
if (number < 0) {
    absolute = -number;
} else {
    absolute = number;
}
```

### Practical Examples
```c
#include <stdio.h>

int main() {
    int marks = 85;
    
    // Simple grade assignment
    char grade = (marks >= 90) ? 'A' : 
                 (marks >= 80) ? 'B' : 
                 (marks >= 70) ? 'C' : 'F';
    printf("Grade: %c\n", grade);  // Grade: B
    
    // Even/odd check
    printf("%d is %s\n", marks, (marks % 2 == 0) ? "even" : "odd");
    
    // Finding minimum
    int x = 15, y = 23, z = 8;
    int min = (x < y) ? ((x < z) ? x : z) : ((y < z) ? y : z);
    printf("Minimum: %d\n", min);  // Minimum: 8
    
    return 0;
}
```

### When to Use Ternary Operator
- **Good for**: Simple assignments based on conditions
- **Avoid for**: Complex logic or multiple statements
- **Keep it readable**: If it's hard to understand, use if-else instead

---

## 2.12 Precedence and Order of Evaluation

### What is Operator Precedence?
Rules that determine which operations are performed first in complex expressions.

### Precedence Table (High to Low)
| Level | Operators | Description | Associativity |
|-------|-----------|-------------|---------------|
| 1 | () [] -> . | Parentheses, arrays, pointers | Left to right |
| 2 | ! ~ ++ -- + - * & | Unary operators | Right to left |
| 3 | * / % | Multiplication, division, modulus | Left to right |
| 4 | + - | Addition, subtraction | Left to right |
| 5 | << >> | Bit shift | Left to right |
| 6 | < <= > >= | Relational | Left to right |
| 7 | == != | Equality | Left to right |
| 8 | & | Bitwise AND | Left to right |
| 9 | ^ | Bitwise XOR | Left to right |
| 10 | \| | Bitwise OR | Left to right |
| 11 | && | Logical AND | Left to right |
| 12 | \|\| | Logical OR | Left to right |
| 13 | ?: | Ternary conditional | Right to left |
| 14 | = += -= etc. | Assignment | Right to left |

### Examples with Explanations
```c
#include <stdio.h>

int main() {
    // Example 1: Arithmetic precedence
    int result1 = 2 + 3 * 4;  // 3 * 4 first, then + 2
    printf("2 + 3 * 4 = %d\n", result1);  // 14, not 20
    
    // Example 2: Using parentheses
    int result2 = (2 + 3) * 4;  // Parentheses first
    printf("(2 + 3) * 4 = %d\n", result2);  // 20
    
    // Example 3: Mixed operators
    int a = 10, b = 5, c = 2;
    int result3 = a + b * c - a / b;
    // Order: b * c (10), a / b (2), then a + 10 - 2
    printf("10 + 5 * 2 - 10 / 5 = %d\n", result3);  // 18
    
    // Example 4: Logical operators
    int x = 5, y = 10;
    if (x < y && y > 0 || x == 0) {
        // Order: x < y (true), y > 0 (true), x == 0 (false)
        // Then: true && true (true), true || false (true)
        printf("Condition is true\n");
    }
    
    return 0;
}
```

### Common Mistakes and Solutions

#### Mistake 1: Assuming left-to-right evaluation
```c
// Wrong assumption
int result = 2 + 3 * 4;  // Might think: (2 + 3) * 4 = 20
// Correct: 2 + (3 * 4) = 14

// Solution: Use parentheses for clarity
int result = 2 + (3 * 4);  // Makes intention clear
```

#### Mistake 2: Complex expressions without parentheses
```c
// Hard to read
if (age >= 18 && score > 80 || grade == 'A' && attendance >= 90)

// Better with parentheses
if ((age >= 18 && score > 80) || (grade == 'A' && attendance >= 90))
```

### Best Practices
1. **Use parentheses** when in doubt
2. **Break complex expressions** into simpler parts
3. **Don't rely on precedence** for readability
4. **Test your expressions** with known values

```c
// Instead of this complex expression:
int complex = a + b * c - d / e + f % g;

// Break it down:
int temp1 = b * c;
int temp2 = d / e;
int temp3 = f % g;
int complex = a + temp1 - temp2 + temp3;
```

---

## Practice Exercises

### Exercise 1: Variable Declaration and Initialization
Create a program that declares variables for a student's information and prints them.

```c
#include <stdio.h>

int main() {
    // Declare and initialize variables
    char name[20] = "John Doe";
    int age = 17;
    float height = 5.8;
    char grade = 'A';
    
    // Print the information
    printf("Student Information:\n");
    printf("Name: %s\n", name);
    printf("Age: %d years\n", age);
    printf("Height: %.1f feet\n", height);
    printf("Grade: %c\n", grade);
    
    return 0;
}
```

### Exercise 2: Calculator Program
Create a simple calculator using arithmetic operators.

```c
#include <stdio.h>

int main() {
    float num1, num2;
    
    printf("Enter two numbers: ");
    scanf("%f %f", &num1, &num2);
    
    printf("%.2f + %.2f = %.2f\n", num1, num2, num1 + num2);
    printf("%.2f - %.2f = %.2f\n", num1, num2, num1 - num2);
    printf("%.2f * %.2f = %.2f\n", num1, num2, num1 * num2);
    
    if (num2 != 0) {
        printf("%.2f / %.2f = %.2f\n", num1, num2, num1 / num2);
    } else {
        printf("Cannot divide by zero!\n");
    }
    
    return 0;
}
```

### Exercise 3: Grade Calculator
Use conditional expressions to determine letter grades.

```c
#include <stdio.h>

int main() {
    int marks;
    
    printf("Enter your marks (0-100): ");
    scanf("%d", &marks);
    
    char grade = (marks >= 90) ? 'A' :
                 (marks >= 80) ? 'B' :
                 (marks >= 70) ? 'C' :
                 (marks >= 60) ? 'D' : 'F';
    
    char *status = (marks >= 60) ? "Pass" : "Fail";
    
    printf("Marks: %d\n", marks);
    printf("Grade: %c\n", grade);
    printf("Status: %s\n", status);
    
    return 0;
}
```

---

## Summary

In this chapter, you learned:

1. **Variable Names**: Rules and conventions for naming variables
2. **Data Types**: Different types (int, char, float, double) and their sizes
3. **Constants**: Using #define and const for unchanging values
4. **Declarations**: How to declare and initialize variables
5. **Arithmetic Operators**: +, -, *, /, % for mathematical operations
6. **Relational & Logical Operators**: Comparing values and combining conditions
7. **Type Conversions**: Implicit and explicit type casting
8. **Increment/Decrement**: ++ and -- operators
9. **Bitwise Operators**: Working with individual bits
10. **Assignment Operators**: = and compound assignments (+=, -=, etc.)
11. **Conditional Expressions**: Ternary operator for simple conditions
12. **Precedence**: Order of operations in complex expressions

### Key Takeaways
- Choose meaningful variable names
- Use appropriate data types for your data
- Be careful with type conversions and integer division
- Use parentheses to make complex expressions clear
- Practice with different operators to build confidence
