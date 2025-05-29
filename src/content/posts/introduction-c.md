---
title: Introduction C
published: 2025-05-29
description: 'A introduction to learn about c'
image: ''
tags: [Embedded, Syntax]
category: 'Clang'
draft: false 
lang: 'en'
---

## Chapter 1 - A Tutorial Introduction

Welcome to the exciting world of C programming! This tutorial is designed specifically for high school students who want to learn one of the most fundamental and powerful programming languages ever created.

### Why Learn C?
- C is the foundation of many modern programming languages
- It helps you understand how computers really work
- It's used in operating systems, embedded systems, and game development
- Learning C makes other languages easier to learn

---

## 1.1 Getting Started

### What is C?
C is a programming language developed in the early 1970s by Dennis Ritchie at Bell Labs. It's called "C" because it was developed after the "B" programming language.

### Setting Up Your Environment
Before we start coding, you need a C compiler. Here are some popular options:

**For Windows:**
- Code::Blocks (recommended for beginners)
- Dev-C++
- Visual Studio Code with C/C++ extension

**For Mac:**
- Xcode Command Line Tools
- Visual Studio Code

**For Linux:**
- GCC (GNU Compiler Collection) - usually pre-installed

### Your First C Program

Let's start with the traditional "Hello, World!" program:

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**Let's break this down:**
- `#include <stdio.h>`: This tells the compiler to include the standard input/output library
- `int main()`: This is the main function where your program starts executing
- `printf()`: This function prints text to the screen
- `\n`: This creates a new line
- `return 0;`: This tells the operating system that the program ended successfully

### Compiling and Running
1. Save your code in a file with `.c` extension (e.g., `hello.c`)
2. Compile: `gcc hello.c -o hello`
3. Run: `./hello` (Linux/Mac) or `hello.exe` (Windows)

---

## 1.2 Variables and Arithmetic Expressions

### What are Variables?
Variables are like containers that store data. In C, you must declare variables before using them.

### Basic Data Types

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer numbers | 42, -17, 0 |
| `float` | Decimal numbers | 3.14, -0.5 |
| `double` | Double precision decimals | 3.141592653589793 |
| `char` | Single characters | 'A', '5', '$' |

### Declaring Variables

```c
#include <stdio.h>

int main() {
    int age;           // Declaration
    age = 16;          // Assignment
    
    int score = 95;    // Declaration and initialization
    float height = 5.8;
    char grade = 'A';
    
    printf("Age: %d\n", age);
    printf("Score: %d\n", score);
    printf("Height: %.1f\n", height);
    printf("Grade: %c\n", grade);
    
    return 0;
}
```

### Arithmetic Operators

```c
#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    printf("Addition: %d + %d = %d\n", a, b, a + b);
    printf("Subtraction: %d - %d = %d\n", a, b, a - b);
    printf("Multiplication: %d * %d = %d\n", a, b, a * b);
    printf("Division: %d / %d = %d\n", a, b, a / b);
    printf("Remainder: %d %% %d = %d\n", a, b, a % b);
    
    return 0;
}
```

**Output:**
```
Addition: 10 + 3 = 13
Subtraction: 10 - 3 = 7
Multiplication: 10 * 3 = 30
Division: 10 / 3 = 3
Remainder: 10 % 3 = 1
```

### Temperature Conversion Example

```c
#include <stdio.h>

int main() {
    float celsius, fahrenheit;
    
    printf("Enter temperature in Celsius: ");
    scanf("%f", &celsius);
    
    fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    
    printf("%.1f°C = %.1f°F\n", celsius, fahrenheit);
    
    return 0;
}
```

---

## 1.3 The for Statement

The `for` loop is perfect when you know how many times you want to repeat something.

### Basic Syntax
```c
for (initialization; condition; increment) {
    // code to repeat
}
```

### Simple Examples

**Counting from 1 to 10:**
```c
#include <stdio.h>

int main() {
    int i;
    
    for (i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\n");
    
    return 0;
}
```

**Multiplication Table:**
```c
#include <stdio.h>

int main() {
    int number, i;
    
    printf("Enter a number: ");
    scanf("%d", &number);
    
    printf("Multiplication table for %d:\n", number);
    for (i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", number, i, number * i);
    }
    
    return 0;
}
```

**Temperature Conversion Table:**
```c
#include <stdio.h>

int main() {
    int celsius;
    float fahrenheit;
    
    printf("Celsius\tFahrenheit\n");
    printf("-------\t----------\n");
    
    for (celsius = 0; celsius <= 100; celsius += 10) {
        fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
        printf("%d\t%.1f\n", celsius, fahrenheit);
    }
    
    return 0;
}
```

---

## 1.4 Symbolic Constants

### What are Symbolic Constants?
Symbolic constants are names that represent fixed values. They make your code more readable and easier to maintain.

### Using #define

```c
#include <stdio.h>

#define PI 3.14159
#define MAX_STUDENTS 30
#define PASSING_GRADE 60

int main() {
    float radius, area;
    
    printf("Enter radius: ");
    scanf("%f", &radius);
    
    area = PI * radius * radius;
    printf("Area of circle: %.2f\n", area);
    
    printf("Maximum students allowed: %d\n", MAX_STUDENTS);
    printf("Passing grade: %d\n", PASSING_GRADE);
    
    return 0;
}
```

### Why Use Constants?
- **Readability**: `PI * radius * radius` is clearer than `3.14159 * radius * radius`
- **Maintainability**: Change the value in one place, and it updates everywhere
- **Prevention of errors**: You can't accidentally change a constant's value

---

## 1.5 Character Input and Output

### Reading Single Characters
```c
#include <stdio.h>

int main() {
    char ch;
    
    printf("Enter a character: ");
    ch = getchar();
    
    printf("You entered: ");
    putchar(ch);
    printf("\n");
    
    return 0;
}
```

### 1.5.1 File Copying

**Simple File Copy Program:**
```c
#include <stdio.h>

int main() {
    int c;
    
    printf("Type some text (Ctrl+D/Ctrl+Z to end):\n");
    
    while ((c = getchar()) != EOF) {
        putchar(c);
    }
    
    return 0;
}
```

**Real File Copying:**
```c
#include <stdio.h>

int main() {
    FILE *source, *destination;
    char source_file[100], dest_file[100];
    int ch;
    
    printf("Enter source filename: ");
    scanf("%s", source_file);
    
    printf("Enter destination filename: ");
    scanf("%s", dest_file);
    
    source = fopen(source_file, "r");
    if (source == NULL) {
        printf("Cannot open source file\n");
        return 1;
    }
    
    destination = fopen(dest_file, "w");
    if (destination == NULL) {
        printf("Cannot create destination file\n");
        fclose(source);
        return 1;
    }
    
    while ((ch = fgetc(source)) != EOF) {
        fputc(ch, destination);
    }
    
    printf("File copied successfully!\n");
    
    fclose(source);
    fclose(destination);
    
    return 0;
}
```

### 1.5.2 Character Counting

```c
#include <stdio.h>

int main() {
    long count = 0;
    int c;
    
    printf("Enter text (Ctrl+D/Ctrl+Z to end):\n");
    
    while ((c = getchar()) != EOF) {
        count++;
    }
    
    printf("Character count: %ld\n", count);
    
    return 0;
}
```

### 1.5.3 Line Counting

```c
#include <stdio.h>

int main() {
    int c, line_count = 0;
    
    printf("Enter text (Ctrl+D/Ctrl+Z to end):\n");
    
    while ((c = getchar()) != EOF) {
        if (c == '\n') {
            line_count++;
        }
    }
    
    printf("Number of lines: %d\n", line_count);
    
    return 0;
}
```

### 1.5.4 Word Counting

```c
#include <stdio.h>

#define IN 1    // inside a word
#define OUT 0   // outside a word

int main() {
    int c, word_count = 0, char_count = 0, line_count = 0;
    int state = OUT;
    
    printf("Enter text (Ctrl+D/Ctrl+Z to end):\n");
    
    while ((c = getchar()) != EOF) {
        char_count++;
        
        if (c == '\n') {
            line_count++;
        }
        
        if (c == ' ' || c == '\n' || c == '\t') {
            state = OUT;
        } else if (state == OUT) {
            state = IN;
            word_count++;
        }
    }
    
    printf("Lines: %d, Words: %d, Characters: %d\n", 
           line_count, word_count, char_count);
    
    return 0;
}
```

---

## 1.6 Arrays

### What are Arrays?
Arrays are collections of variables of the same type, stored in consecutive memory locations.

### Declaring and Initializing Arrays

```c
#include <stdio.h>

int main() {
    int numbers[5];                    // Declare array of 5 integers
    int scores[3] = {85, 92, 78};     // Declare and initialize
    int grades[] = {90, 85, 88, 92};  // Size determined automatically
    
    // Assigning values
    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;
    numbers[3] = 40;
    numbers[4] = 50;
    
    // Printing array elements
    printf("Numbers array:\n");
    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }
    
    return 0;
}
```

### Array Examples

**Finding Maximum Value:**
```c
#include <stdio.h>

int main() {
    int numbers[] = {23, 67, 12, 89, 45, 34, 78};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    int max = numbers[0];
    
    for (int i = 1; i < size; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    
    printf("Maximum value: %d\n", max);
    
    return 0;
}
```

**Student Grades Program:**
```c
#include <stdio.h>

int main() {
    int num_students;
    
    printf("Enter number of students: ");
    scanf("%d", &num_students);
    
    int grades[num_students];  // Variable-length array
    int total = 0;
    
    // Input grades
    for (int i = 0; i < num_students; i++) {
        printf("Enter grade for student %d: ", i + 1);
        scanf("%d", &grades[i]);
        total += grades[i];
    }
    
    // Calculate and display average
    float average = (float)total / num_students;
    printf("Average grade: %.2f\n", average);
    
    // Display all grades
    printf("All grades: ");
    for (int i = 0; i < num_students; i++) {
        printf("%d ", grades[i]);
    }
    printf("\n");
    
    return 0;
}
```

---

## 1.7 Functions

### What are Functions?
Functions are reusable blocks of code that perform specific tasks. They help organize your program and avoid code repetition.

### Basic Function Structure

```c
return_type function_name(parameters) {
    // function body
    return value;  // if return_type is not void
}
```

### Simple Function Examples

```c
#include <stdio.h>

// Function to add two numbers
int add(int x, int y) {
    return x + y;
}

// Function to print a greeting
void greet(char name[]) {
    printf("Hello, %s!\n", name);
}

// Function to calculate square
int square(int num) {
    return num * num;
}

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);
    
    greet("Alice");
    
    printf("Square of 7 = %d\n", square(7));
    
    return 0;
}
```

### More Complex Function Example

```c
#include <stdio.h>

// Function to check if a number is prime
int is_prime(int num) {
    if (num <= 1) return 0;  // Not prime
    if (num <= 3) return 1;  // Prime
    if (num % 2 == 0 || num % 3 == 0) return 0;  // Not prime
    
    for (int i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
            return 0;  // Not prime
        }
    }
    return 1;  // Prime
}

// Function to calculate factorial
long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // Recursive call
}

int main() {
    int number;
    
    printf("Enter a number: ");
    scanf("%d", &number);
    
    if (is_prime(number)) {
        printf("%d is a prime number.\n", number);
    } else {
        printf("%d is not a prime number.\n", number);
    }
    
    printf("Factorial of %d = %ld\n", number, factorial(number));
    
    return 0;
}
```

---

## 1.8 Arguments - Call by Value

### Understanding Call by Value
In C, when you pass arguments to functions, copies of the values are passed, not the original variables.

```c
#include <stdio.h>

void try_to_change(int x) {
    x = 100;  // This only changes the local copy
    printf("Inside function: x = %d\n", x);
}

int main() {
    int number = 50;
    
    printf("Before function call: number = %d\n", number);
    try_to_change(number);
    printf("After function call: number = %d\n", number);
    
    return 0;
}
```

**Output:**
```
Before function call: number = 50
Inside function: x = 100
After function call: number = 50
```

### Practical Example - Swap Function (Doesn't Work!)

```c
#include <stdio.h>

// This doesn't work because of call by value
void wrong_swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("Inside function: a = %d, b = %d\n", a, b);
}

int main() {
    int x = 5, y = 10;
    
    printf("Before swap: x = %d, y = %d\n", x, y);
    wrong_swap(x, y);
    printf("After swap: x = %d, y = %d\n", x, y);
    
    return 0;
}
```

### Calculator Function Example

```c
#include <stdio.h>

float calculate(float a, float b, char operation) {
    switch(operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': 
            if (b != 0) return a / b;
            else {
                printf("Error: Division by zero!\n");
                return 0;
            }
        default:
            printf("Error: Invalid operation!\n");
            return 0;
    }
}

int main() {
    float num1, num2, result;
    char op;
    
    printf("Enter first number: ");
    scanf("%f", &num1);
    
    printf("Enter operation (+, -, *, /): ");
    scanf(" %c", &op);  // Note the space before %c
    
    printf("Enter second number: ");
    scanf("%f", &num2);
    
    result = calculate(num1, num2, op);
    printf("Result: %.2f %c %.2f = %.2f\n", num1, op, num2, result);
    
    return 0;
}
```

---

## 1.9 Character Arrays

### What are Character Arrays?
Character arrays (strings) are arrays that store sequences of characters, ending with a null character '\0'.

### Declaring and Initializing Strings

```c
#include <stdio.h>
#include <string.h>

int main() {
    char name1[20];                    // Declare character array
    char name2[] = "Alice";            // Initialize with string literal
    char name3[10] = {'B', 'o', 'b', '\0'};  // Initialize character by character
    
    // Getting string input
    printf("Enter your name: ");
    scanf("%s", name1);  // Note: no & needed for arrays
    
    printf("Hello, %s!\n", name1);
    printf("Name2: %s\n", name2);
    printf("Name3: %s\n", name3);
    
    return 0;
}
```

### String Manipulation Examples

**String Length Function:**
```c
#include <stdio.h>

int string_length(char str[]) {
    int length = 0;
    while (str[length] != '\0') {
        length++;
    }
    return length;
}

int main() {
    char message[] = "Hello, World!";
    
    printf("String: %s\n", message);
    printf("Length: %d\n", string_length(message));
    
    return 0;
}
```

**String Copy Function:**
```c
#include <stdio.h>

void string_copy(char destination[], char source[]) {
    int i = 0;
    while (source[i] != '\0') {
        destination[i] = source[i];
        i++;
    }
    destination[i] = '\0';  // Don't forget the null terminator!
}

int main() {
    char original[] = "Programming";
    char copy[20];
    
    string_copy(copy, original);
    
    printf("Original: %s\n", original);
    printf("Copy: %s\n", copy);
    
    return 0;
}
```

**String Comparison:**
```c
#include <stdio.h>

int string_compare(char str1[], char str2[]) {
    int i = 0;
    while (str1[i] != '\0' && str2[i] != '\0') {
        if (str1[i] < str2[i]) return -1;
        if (str1[i] > str2[i]) return 1;
        i++;
    }
    
    if (str1[i] == '\0' && str2[i] == '\0') return 0;
    if (str1[i] == '\0') return -1;
    return 1;
}

int main() {
    char word1[50], word2[50];
    
    printf("Enter first word: ");
    scanf("%s", word1);
    
    printf("Enter second word: ");
    scanf("%s", word2);
    
    int result = string_compare(word1, word2);
    
    if (result == 0) {
        printf("The words are equal.\n");
    } else if (result < 0) {
        printf("'%s' comes before '%s' alphabetically.\n", word1, word2);
    } else {
        printf("'%s' comes after '%s' alphabetically.\n", word1, word2);
    }
    
    return 0;
}
```

---

## 1.10 External Variables and Scope

### Understanding Scope
Scope determines where variables can be accessed in your program.

### Local vs Global Variables

```c
#include <stdio.h>

int global_counter = 0;  // Global variable

void increment_global() {
    global_counter++;
    printf("Global counter in function: %d\n", global_counter);
}

void local_example() {
    int local_var = 10;  // Local variable
    printf("Local variable: %d\n", local_var);
    // local_var is only accessible within this function
}

int main() {
    int main_var = 5;  // Local to main function
    
    printf("Global counter in main: %d\n", global_counter);
    
    increment_global();
    increment_global();
    
    printf("Global counter after function calls: %d\n", global_counter);
    
    local_example();
    
    // printf("%d", local_var);  // Error! local_var not accessible here
    
    return 0;
}
```

### Static Variables

```c
#include <stdio.h>

void count_calls() {
    static int call_count = 0;  // Static variable
    call_count++;
    printf("This function has been called %d times\n", call_count);
}

int main() {
    for (int i = 0; i < 5; i++) {
        count_calls();
    }
    
    return 0;
}
```

### Student Record System Example

```c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100

// Global variables
int total_students = 0;
char student_names[MAX_STUDENTS][50];
int student_grades[MAX_STUDENTS];

void add_student(char name[], int grade) {
    if (total_students < MAX_STUDENTS) {
        strcpy(student_names[total_students], name);
        student_grades[total_students] = grade;
        total_students++;
        printf("Student added successfully!\n");
    } else {
        printf("Cannot add more students. Maximum limit reached.\n");
    }
}

void display_all_students() {
    printf("\n--- Student Records ---\n");
    for (int i = 0; i < total_students; i++) {
        printf("%d. %s - Grade: %d\n", i+1, student_names[i], student_grades[i]);
    }
    printf("Total students: %d\n\n", total_students);
}

float calculate_average() {
    if (total_students == 0) return 0;
    
    int sum = 0;
    for (int i = 0; i < total_students; i++) {
        sum += student_grades[i];
    }
    
    return (float)sum / total_students;
}

int main() {
    int choice, grade;
    char name[50];
    
    while (1) {
        printf("1. Add student\n");
        printf("2. Display all students\n");
        printf("3. Calculate average grade\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter student name: ");
                scanf("%s", name);
                printf("Enter grade: ");
                scanf("%d", &grade);
                add_student(name, grade);
                break;
                
            case 2:
                display_all_students();
                break;
                
            case 3:
                printf("Average grade: %.2f\n\n", calculate_average());
                break;
                
            case 4:
                printf("Goodbye!\n");
                return 0;
                
            default:
                printf("Invalid choice!\n");
        }
    }
    
    return 0;
}
```

---

## Key Programming Concepts Summary

1. **Variables**: Store data in your program
2. **Functions**: Organize code into reusable blocks
3. **Arrays**: Handle collections of similar data
4. **Loops**: Repeat actions efficiently
5. **Conditions**: Make decisions in your program
6. **Scope**: Understand where variables can be accessed

:::tip
1. **Practice regularly**: Programming is like learning a musical instrument - practice makes perfect
2. **Start small**: Begin with simple programs and gradually increase complexity
3. **Debug systematically**: Learn to read error messages and fix problems step by step
4. **Comment your code**: Write explanations for future you and others
5. **Test thoroughly**: Always test your programs with different inputs
:::

:::note
Every programmer started as a beginner. Don't be discouraged by errors - they're part of the learning process!
:::