# ABAP Hello World model results

- Prompt: Write a minimal Hello World program in ABAP. Return only the complete program.
- Model precision: q4
- Completed: 11/12

| Model | Status |
| --- | --- |
| `HuggingFaceTB/SmolLM2-360M-Instruct` | Completed |
| `onnx-community/LFM2-700M-ONNX` | Completed |
| `onnx-community/Qwen2.5-0.5B-Instruct` | Completed |
| `onnx-community/gemma-3-1b-it-ONNX` | Completed |
| `onnx-community/Qwen2.5-Coder-0.5B-Instruct` | Completed |
| `onnx-community/TinyLlama-1.1B-Chat-v1.0-ONNX` | Completed |
| `onnx-community/Qwen3-0.6B-Instruct-ONNX` | Failed |
| `onnx-community/deepseek-coder-1.3b-instruct-ONNX` | Completed |
| `HuggingFaceTB/SmolLM2-1.7B-Instruct` | Completed |
| `onnx-community/Llama-3.2-1B-Instruct-ONNX` | Completed |
| `onnx-community/Qwen2.5-1.5B-Instruct` | Completed |
| `onnx-community/Qwen2.5-Coder-1.5B-Instruct` | Completed |

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

data (name,

## onnx-community/LFM2-700M-ONNX

```abap
DO WHILE (NUMERIC(1,2) = 1).
    PRINT 'Hello, World!';
END DO
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
* **`class ... end.`**:  This defines a class (though it's a simple one) to encapsulate the logic

## onnx-community/Qwen2.5-Coder-0.5B-Instruct

```abap
program hello_world.
  write: 'Hello, World!'.
end program hello_world.
```

## onnx-community/TinyLlama-1.1B-Chat-v1.0-ONNX

Here's a minimal Hello World program in ABAP:

```abap
PROCEDURE d001_hello_world.
  SEND / "Hello, world!" TEXT TO / "standard output".
ENDPROCEDURE.
```

This program simply sends a message to the standard output. It doesn't do any other useful things.

## onnx-community/Qwen3-0.6B-Instruct-ONNX

Generation failed: `Cannot use apply_chat_template() because tokenizer.chat_template is not set and no template argument was passed! For information about writing templates and setting the tokenizer.chat_template attribute, please see the documentation at https://huggingface.co/docs/transformers/main/en/chat_templating`

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
This code will print out all routines with name 'Z_HELLO_WORLD'. The routine should return a table of text messages which contain descriptions for each message. Please note that this solution assumes you have access to system tables such as `SY

## HuggingFaceTB/SmolLM2-1.7B-Instruct

CLASS-EXTENSIBILITY HELLO-WORLD
METHOD-BYTES
01 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

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
