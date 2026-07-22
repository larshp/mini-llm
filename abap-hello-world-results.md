# ABAP Hello World model results

- Prompt: Write a minimal Hello World program in ABAP. Return only the complete program.
- Model precision: q4
- Expected memory: estimated range for this short prompt and 512-token limit
- Completed: 29/29

| Model | Released | Parameters | Expected memory | Generation runtime | Status |
| --- | --- | ---: | ---: | ---: | --- |
| `onnx-community/granite-4.0-350m-ONNX-web` | 2025-10-28 | 340M | 800–1,100 MB | 2 s | Completed |
| `onnx-community/LFM2-350M-ONNX` | 2025-07-10 | 350M | 500–750 MB | 17 s | Completed |
| `onnx-community/LFM2.5-350M-ONNX` | 2026-03-31 | 350M | 500–750 MB | 1 s | Completed |
| `onnx-community/MobileLLM-R1-360M-ONNX` | 2025-09-12 | 359M | 900–1,250 MB | 18 s | Completed |
| `HuggingFaceTB/SmolLM2-360M-Instruct` | 2024-11-02 | 360M | 600–850 MB | 27 s | Completed |
| `onnx-community/Qwen2.5-0.5B-Instruct` | 2024-09-19 | 494M | 1,050–1,400 MB | 9 s | Completed |
| `onnx-community/Qwen2.5-Coder-0.5B-Instruct` | 2024-11-12 | 494M | 1,150–1,550 MB | 2 s | Completed |
| `onnx-community/Apertus-v1.1-0.5B-Instruct-ONNX` | 2026-05-29 | 564M | 800–1,150 MB | 29 s | Completed |
| `onnx-community/LFM2-700M-ONNX` | 2025-07-10 | 742M | 800–1,100 MB | 4 s | Completed |
| `onnx-community/MobileLLM-R1-950M-ONNX` | 2025-09-12 | 949M | 1,700–2,250 MB | 42 s | Completed |
| `onnx-community/gemma-3-1b-it-ONNX` | 2025-03-12 | 1B | 1,150–1,550 MB | 57 s | Completed |
| `onnx-community/TinyLlama-1.1B-Chat-v1.0-ONNX` | 2023-12-31 | 1.1B | 1,200–1,600 MB | 10 s | Completed |
| `onnx-community/LFM2-1.2B-ONNX` | 2025-07-10 | 1.2B | 1,200–1,700 MB | 4 s | Completed |
| `onnx-community/Llama-3.2-1B-Instruct-ONNX` | 2024-09-25 | 1.23B | 2,100–2,750 MB | 9 s | Completed |
| `onnx-community/deepseek-coder-1.3b-instruct-ONNX` | 2023-11-02 | 1.3B | 1,400–1,850 MB | 39 s | Completed |
| `onnx-community/granite-4.0-1b-ONNX-web` | 2025-10-28 | 1.5B | 2,400–3,200 MB | 2 s | Completed |
| `onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX` | 2025-01-20 | 1.5B | 2,400–2,950 MB | 50 s | Completed |
| `onnx-community/Qwen2.5-1.5B-Instruct` | 2024-09-19 | 1.54B | 2,200–2,900 MB | 17 s | Completed |
| `onnx-community/Qwen2.5-Coder-1.5B-Instruct` | 2024-09-19 | 1.54B | 2,200–2,900 MB | 11 s | Completed |
| `onnx-community/TinySwallow-1.5B-Instruct-ONNX` | 2025-01-30 | 1.54B | 2,250–2,950 MB | 49 s | Completed |
| `HuggingFaceTB/SmolLM2-1.7B-Instruct` | 2024-11-02 | 1.7B | 1,750–2,300 MB | 98 s | Completed |
| `onnx-community/Falcon3-1B-Instruct` | 2024-12-17 | 1.7B | 2,400–2,950 MB | 12 s | Completed |
| `onnx-community/Bonsai-1.7B-ONNX` | 2026-03 | 1.7B | 1,600–2,300 MB | 7 s | Completed |
| `onnx-community/Qwen3-1.7B-ONNX` | 2025-04-29 | 1.7B | 2,700–3,600 MB | 10 s | Completed |
| `HuggingFaceTB/SmolLM3-3B-ONNX` | 2025-07-08 | 3B | 3,500–4,500 MB | 139 s | Completed |
| `onnx-community/Qwen2.5-Coder-3B-Instruct` | 2024-11-12 | 3.09B | 3,900–4,900 MB | 6 s | Completed |
| `onnx-community/Phi-3-mini-4k-instruct-ONNX` | 2024-06 | 3.8B | 3,400–4,500 MB | 13 s | Completed |
| `onnx-community/Phi-4-mini-instruct-ONNX` | 2025-02 | 3.8B | 3,500–4,700 MB | 27 s | Completed |
| `onnx-community/Qwen3-4B-Instruct-2507-ONNX` | 2025-08-05 | 4.02B | 4,800–5,900 MB | 8 s | Completed |

## onnx-community/granite-4.0-350m-ONNX-web

SUBC PROGRAM 'Hello World' FOR ALL
IF ABAP_HWHELLOHELLO
    ABAP_HWHELLOHELLO.
    ABAP_HWHELLOHELLO.
END IF.
END SUBC.

## onnx-community/LFM2-350M-ONNX

```abap
program HelloWorldABAP
begin
    ; Define variables
    DECLARE
        IDENTIFIED BY x
        PRINT 'Hello, World!';
    UNLIMIT

    ; Create a console application
    CREATE PROGRAM 'HelloWorldABAP' AS
    ; Main loop
    PRINT 'Starting main loop...';
    DO UNLIMIT
        PRINT 'Processing line: ';
        ; Read input from user
        LET x = (INPUT_PAR(1));

        ; Check if input is not empty
        IF NOT EXISTS (SELECT 1 FROM sys_Input) THEN
            PRINT 'Error: No input received.';
            CONTINUE;
        END IF;

        ; Process input
        FOR I = 1 TO 1000;
            PRINT 'Input: ';
            SET x = (VALUES(x) <> '') TO 'Input ', i;
            SET v = (VALUES(x) = v + 1);
            PRINT 'Existing: ';
            SET s = (VALUES(x) = s) TO 'Existing ', i;
            IF s <> v THEN
                PRINT 'New: ';
                SET t = (VALUES(x) = s) TO 'New ', i;
                PRINT 'Value: ';
                SET w = (VALUES(x) = v + 10) TO 'Value ', i;
                PRINT 'Changed: ';
                SET h = (VALUES(x) = v - 5) TO 'Changed ', i;
                PRINT 'Updated: ';
                SET j = (VALUES(x) = v) TO 'Updated ', i;
                PRINT 'New Value: ';
                SET k = (VALUES(x) = v + w) TO 'New Value ', i;
                PRINT 'New Value: ';
                SET l = (VALUES(x) = v - h) TO 'New Value ', i;
                PRINT 'Value: ';
                SET m = (VALUES(x) = v + j) TO 'Value ', i;
                PRINT 'Final Value: ';
                SET n = (VALUES(x) = v + k) TO 'Final Value ', i;
                PRINT 'Final Value: ';
                PRINT 'Value: ';
                SET o = (VALUES
```

## onnx-community/LFM2.5-350M-ONNX

Hello World

## onnx-community/MobileLLM-R1-360M-ONNX

<|amend></a>

---

Note: This problem statement is not yet provided, but it's possible that this question might be related to writing a minimal Hello World function for an abap system.

The user says "Write a minimal Hello World program in ABAP." So I need to write a Python-like program (or more accurately, a C++-like language) that returns the value 1 when called with arguments [1], which would return 1. But since the user mentioned returning 1 as the output of the program, perhaps they want a function that outputs 1 when given 1. However, in programming languages like Python or JavaScript, you can call such functions and get their values directly. In the context of the problem, maybe the task is to create a function that does something specific, like printing 1 on screen.

But looking back at the note: "Return only the complete program" — so perhaps the actual code should be written as a program that prints 1 when run. The instruction says "program," which could mean a script file.

Alternatively, if it's a function, then the code inside the function would do nothing. For example:

function hello(1) {
    print("Hello");
}

Then calling hello(1) would execute the loop and print once. If the argument is passed as a number, say 1000, then the loop runs 1000 times, printing each time. Then the final result depends on how many iterations there are. If we start from 1 and iterate up to N, where N=1000, then after 1000 iterations, the last iteration would print again? Or do we stop before reaching N?

In programming terms, typically, loops terminate when the condition is met. So if the parameter is 1000, the loop will continue until it reaches 1, then go beyond. So if we have a variable initialized to 1, and we set it to 2,3,...,999,1000, then setting its initial value to 1 and iterating over it would generate numbers starting from 2 onwards. Wait, no. Let me think about the syntax.

If the function is declared as:

int main() { // initialize int to 1
    while(int x = 1000)
        cout <<x<<endl;
    return; // exit without changing int
}

This would print 2,3,...,999,1000. Because the outermost loop starts at 1000 and goes down

## HuggingFaceTB/SmolLM2-360M-Instruct

*Program: Minimal Hello World Program in ABAP*

```abp
program "Hello World"

data (name, age) as (
    "John Doe", 25
);

data (name, age) as (
    "Jane Smith", 30
);

data (name, age) as (
    "Bob Johnson", 21
);

data (name, age) as (
    "Alice Brown", 24
);

data (name, age) as (
    "Mike Davis", 27
);

data (name, age) as (
    "Dave Williams", 26
);

data (name, age) as (
    "Joe Smith", 28
);

data (name, age) as (
    "Mike Davis", 29
);

data (name, age) as (
    "Dave Williams", 30
);

data (name, age) as (
    "Mike Davis", 31
);

data (name, age) as (
    "Dave Williams", 32
);

data (name, age) as (
    "Mike Davis", 33
);

data (name, age) as (
    "Dave Williams", 34
);

data (name, age) as (
    "Mike Davis", 35
);

data (name, age) as (
    "Dave Williams", 36
);

data (name, age) as (
    "Mike Davis", 37
);

data (name, age) as (
    "Dave Williams", 38
);

data (name, age) as (
    "Mike Davis", 39
);

data (name, age) as (
    "Dave Williams", 40
);

data (name, age) as (
    "Mike Davis", 41
);

data (name, age) as (
    "Dave Williams", 42
);

data (name, age) as (
    "Mike Davis", 43
);

data (name, age) as (
    "Dave Williams", 44
);

data (name, age) as (
```

## onnx-community/Qwen2.5-0.5B-Instruct

Certainly! Below is a minimal example of a Hello World program written in ABAP using the System Library.

```abap
PROGRAM HelloWorld

DATA:    NAME 'Variable to hold the name',
       MESSAGE 'Hello, World!' AS MESSAGE,

READ TABLE Users INTO NAME,
       MESSAGE AS MESSAGE,

WRITE TO MESSAGE AS 'Hello, World!' AS MESSAGE,

END PROGRAM HelloWorld
```

This program defines a simple system library function `HelloWorld` that prints "Hello, World!" to the console. The `READ TABLE Users INTO NAME, MESSAGE AS MESSAGE` statement reads the values from the `Users` table into variables `NAME` and `MESSAGE`, which are then printed to the console.

## onnx-community/Qwen2.5-Coder-0.5B-Instruct

```abap
program hello_world.
  write: 'Hello, World!'.
end program hello_world.
```

## onnx-community/Apertus-v1.1-0.5B-Instruct-ONNX

```abap
PROGRAMMER'S COMMON
  PRIVATE FUNCTION
  (
    OUT: STRING := "Hello, World!"
  ) PROCEDURE,
  (
    IN: STRING := "Hello, World!"
  ) FUNC,
  (
    IN: ARRAY OF CHARS := "abcdefghijkljklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) TARGET
  (
    IN: ARRAY OF CHARS := "abcdefghijkljklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) TARGET
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) STRING,
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) STRING,
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) STRING,
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) STRING,
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) STRING,
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) ARRAY OF CHARS,
  (
    OUT: STRING := ""
  ) STRING,
  (
    IN: STRING := "Hello, World!"
  ) STRING,
  (
    IN: ARRAY OF CHARS := "abcdefghijklmno"
  ) AR
```

## onnx-community/LFM2-700M-ONNX

```abap
DO WHILE (NUMERIC(1,2) = 1).
    PRINT 'Hello, World!';
END DO
```

## onnx-community/MobileLLM-R1-950M-ONNX

<think>
Okay, I need to write a minimal Hello World program in ABAP. Let me think about what ABAP is like. ABAP stands for Application Program Language, which is used in some older systems like IBM's mainframe environments. The key points here are that it's very simple compared to modern languages.

In ABAP, the structure of a program starts with a header line. Then there's the code section where the actual logic goes. So the basic outline would be:

- A header line starting with "ABAP" followed by a newline.
- Then the code section, which includes the "PROG" keyword at the beginning of each line, indicating the start of the program.

The simplest way to output "Hello World" would involve writing lines that print this message. In ABAP, you can use the PRINT statement or the SELECT statement to display text. But since we want the minimal version, maybe using the PRINT statement directly.

Wait, but how does the syntax work? For example, the first line should be the header: "ABAP". Then the code part. Each line in the code section starts with "PROG", then the command (like PRINT), and ends with a newline.

So putting it all together:

Line 1: ABAP
Line 2: PROG
Line 3: PRINT 'Hello World'
Line 4: END

But wait, the problem says "return only the complete program." So perhaps the entire code needs to be written as one block. Also, the code must end with END.

Let me check if there's any specific rules for ABAP. From what I remember, ABAP uses a very limited set of commands. The headers include the PROGRAM keyword, which is placed on the same line as the header. Wait, no—the header is on its own line. Then the code follows.

Another thing: the code section doesn't have any comments except those within the lines. So the code would look like:

PROGRAM:
  ABAP
  SELECT
    PRINT 'Hello World' $$
  END

Wait, but the header is just "ABAP" on a separate line. Then the code starts with "SELECT" because in ABAP, the default selection method is SELECT. Because the header is on the same line as the header keyword, but according to ABAP documentation, the header is on a separate line. Hmm, maybe not. Let me recall: the standard ABAP header has the program name on the same line. Or is

## onnx-community/gemma-3-1b-it-ONNX

```abap
析子: hello_world
  lobs
    message string
  report
  class
    "ABAP class for a simple message display"
      label
        "Hello, World!"
      end.
    "A simple ABAP class for a message display"
      label
        "Hello, World!"
      end.
  end.
  "Displaying the message"
    lobs
      message "Hello, World!"
    report
  end.
  "End of the message display"
    "End of the message display"
```

**Explanation:**

* **`析子: hello_world`**: Defines a subroutine named `hello_world`. This is standard ABAP practice.
* **`lobs`**: Specifies the labels that will be populated within the subroutine.
* **`message string`**:  Defines a label named `message` which will hold the string "Hello, World!".
* **`report`**:  This label is used to display the contents of the `message` label.
* **`class ... end.`**:  This defines a class (though it's a simple one) to encapsulate the logic.  It's a common pattern in ABAP.
* **`label ... end.`**:  These are labels used to display text.
* **`"Displaying the message"`**:  This is a descriptive label used to show the output.
* **`lobs`**: Specifies the labels that will be populated within the label.
* **`"End of the message display"`**:  This is a label used to indicate the end of the message display.
* **`"End of the message display"`**:  This is a label used to indicate the end of the message display.

This code demonstrates a basic ABAP subroutine that displays a message. It's a fundamental example demonstrating how to structure ABAP code.

## onnx-community/TinyLlama-1.1B-Chat-v1.0-ONNX

Here's a minimal Hello World program in ABAP:

```abap
PROCEDURE d001_hello_world.
  SEND / "Hello, world!" TEXT TO / "standard output".
ENDPROCEDURE.
```

This program simply sends a message to the standard output. It doesn't do any other useful things.

## onnx-community/LFM2-1.2B-ONNX

```abap
DATA;
PROGRAM HelloWorld;
    WRITE 'Hello, World!';
END;
GO
```

## onnx-community/Llama-3.2-1B-Instruct-ONNX

```abap
PROGRAM zHelloWorld.

  " Define the main function with no parameters.
  " This is the entry point of the program.
  " The program will print 'Hello, World!' to the screen.

  " Use the MESSAGE function to display a message.
  MESSAGE ID 'ZHELLOWORLD' TYPE 'U' DISPLAY 'Hello, World!'.

ENDProgram.
```

## onnx-community/deepseek-coder-1.3b-instruct-ONNX

Sure, here is a simple "Hello, world!" program written in ABAP (ABAP Programming Language). 

```abap
REPORT Z_HELLO_WORLD.

DATA: lt_message TYPE TABLE OF SYSTEXT-TEXT(100),
      lt_text    TYPE TABLE OF TEXT(256).

START-OF-SELECTION.
  SELECT * FROM SUSER_SRVROUTINES WHERE SRVNAME = 'Z_HELLO_WORLD' INTO TABLE lt_message.
  CALL METHOD lt_message->createTableFromSrvRoutines().
  LOOP AT lt_message ASSIGN TO lt_text.
  WRITE: / 'Message number ', LENGTH(lt_text) , '-', lt_text .
END-OF-SELECTION.
```
This code will print out all routines with name 'Z_HELLO_WORLD'. The routine should return a table of text messages which contain descriptions for each message. Please note that this solution assumes you have access to system tables such as `SYSTEXT-TEXT` and `TXT`. If not, please adjust accordingly. Also, it does not handle errors or exceptions properly. In real scenarios, error handling would be necessary.

## onnx-community/granite-4.0-1b-ONNX-web

REPORT hello_world.

START NEXT LINE.

## onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX

<think>
Okay, I need to write a minimal Hello World program in ABAP. Let me think about what that entails. 

First, I should consider the structure of a typical ABAP program. It usually starts with a data declaration for the first record. Since this is a simple program, I don't need any complex data types.

I'll start by declaring a new record. The name can be anything, but "record1" seems straightforward. Then, I'll set the ID field to 0. IDs are good because they're unique across records.

Next, I need to output the ID. In ABAP, you can use the echo command to print messages. So, I'll include echo 'Hello World' followed by a newline using echo ' '.

I should also check if there's any other necessary fields. Since this is minimal, no additional fields are needed beyond the ID. 

I should make sure the program is self-contained without relying on external libraries or modules. Just using the echo command should suffice.

Putting it all together, the program declares a record, sets its ID, and outputs it. This should work as a Hello World example.
</think>

Here's a minimal ABAP program that prints "Hello World" using the echo command:

```abap
declare record1 as record
set record1.ID = 0
echo 'Hello World'
```

This program declares a new record, sets its ID to 0, and prints "Hello World" using the echo command.

## onnx-community/Qwen2.5-1.5B-Instruct

```abap
REPORT z_hello_world.

DATA: lv_message TYPE string VALUE 'Hello, World!'.
```

This is a minimal ABAP program that prints "Hello, World!" to the screen. It uses the `REPORT` statement to define the report, `DATA` to declare variables, and `VALUE` to assign values to those variables. The `lv_message` variable holds the message to be displayed, which is set to "Hello, World!" in this case.

## onnx-community/Qwen2.5-Coder-1.5B-Instruct

```abap
REPORT z_hello_world.
DATA: lv_message TYPE string VALUE 'Hello, World!'.
MESSAGE lv_message TYPE sy-msgtext.
```
This program declares a variable `lv_message` of type string and assigns it the value 'Hello, World!', then displays this message using the `MESSAGE` statement with the system message type `sy-msgtext`.

## onnx-community/TinySwallow-1.5B-Instruct-ONNX

```ABAP
REPORT ZHELLOWORLD.

DATA: LS_HELLO_W ORG-STRING VALUE SY-LANG.
LS_HELLO_W = SY-MSGSTR( 'HELLO' ).
WRITE: (LS_HELLO_W).
```

**Explanation:**

* **REPORT ZHELLOWORLD:** This line declares a report named "ZHELLOWORLD".
* **DATA:** This section is used to declare data objects.
    * **LS_HELLO_W ORG-STRING VALUE SY-LANG:** This variable is declared as an organization string (`ORG-STRING`) and initialized with the current language value (`SY-LANG`).
    * **WRITE: (LS_HELLO_W):** This statement writes the content of `LS_HELLO_W` to the console, which will display the message "HELLO" in the current language.
* **WRITE: (LS_HELLO_W):** This statement simply prints the value of `LS_HELLO_W`, which contains the message "HELLO".

This program demonstrates how to create a simple "Hello World" program in ABAP. It uses the `WRITE` statement to print the message, which is automatically translated into the user's language by the system.

## HuggingFaceTB/SmolLM2-1.7B-Instruct

CLASS-EXTENSIBILITY HELLO-WORLD
METHOD-BYTES
01 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

## onnx-community/Falcon3-1B-Instruct

```ABAPĊ// Minimal Hello World Program in ABAPĊĊDATA:Ċ    str_name := "Hello, World!";Ċ    greeting := "Hello, " + str_name + "!";ĊĊPRINT:Ċ    greeting;Ċ```

## onnx-community/Bonsai-1.7B-ONNX

```abap
program hello_world is
    display "Hello, World!\n";
end program;
```

## onnx-community/Qwen3-1.7B-ONNX

<think>
</think>

```abap
REPORT LCOSS_HELLOWORLD.

DATA: lv_message TYPE c16.

lv_message = 'Hello World!'.

WRITE lv_message.
```

## HuggingFaceTB/SmolLM3-3B-ONNX

<think>
Okay, I need to write a minimal "Hello World" program in ABAP. Let me recall how ABAP works.

First, the structure of an ABAP program typically includes the class definition, the main method, and any necessary include files. Since it's a simple program, maybe just a single class with a main method.

The main method is usually named "main". Inside it, we have the standard parameters like "this", "super", etc., but since there's no inheritance here, maybe just "this".

Inside the main method, we'll print out "Hello World!" using the ABAP Console's output function. The standard way to do this is using the "out" method from the "Console" class.

Wait, the ABAP standard says that the main method should be static. So the signature would be something like:

public static void main(String[] args) {... }

But in Java-like syntax, the main method is declared as public static void main(String[] args).

So putting it all together, the code would look like:

class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}

But wait, the ABAP standard requires that the class name matches the package name. If there's no package, then the class name can be used directly. But if we're not in a package, then the class name should be in camelCase? Or maybe not. Wait, the ABAP standard allows for classes without a package, so the class name can be in PascalCase or camelCase. However, the main method is static, so the class doesn't need to be in a package.

But in the code above, the class is named HelloWorld, which is PascalCase. That's acceptable.

Now, let me check if there are any other requirements. For example, the ABAP standard requires that the class has a constructor, but in this case, the class doesn't have one because it's a static method. So that's okay.

Another thing to consider: the ABAP standard requires that the class has a default constructor, but since the class is static, the default constructor is implicit. So that's fine.

Putting it all together, the code should be:

class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}

Wait, but the ABAP standard also requires that the class has a default constructor. However, since the class is static, the default constructor is automatically

## onnx-community/Qwen2.5-Coder-3B-Instruct

```abap
REPORT z_hello_world.

WRITE 'Hello, World!'.
```

## onnx-community/Phi-3-mini-4k-instruct-ONNX

```abap

REPORT z_hello_world.


STARTFORMULA.

WRITE 'Hello, world!'.

ENDFORMULA.

```

## onnx-community/Phi-4-mini-instruct-ONNX

```abap
REPORT zhello_world.

START-OF-SEQUENCE.
  WRITE: / 'Hello, World!'.
END-OF-SEQUENCE.
```

Save this as `hello_world.abap` and execute it to see "Hello, World!" printed on the screen.

## onnx-community/Qwen3-4B-Instruct-2507-ONNX

```abap
PROGRAM hello_world.
  WRITE: 'Hello World'.
ENDPROGRAM.
```
