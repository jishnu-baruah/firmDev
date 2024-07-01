@echo off

REM Check if sketch file path is provided
IF "%~1"=="" (
    echo Usage: %~nx0 ^<path_to_sketch_file^>
    exit /b 1
)

REM Get the absolute path to the sketch file
SET SKETCH_FILE=%~1

REM Get the directory containing the sketch file
SET SKETCH_DIR=%~dp1

REM Define the build output directory
SET BUILD_DIR=%SKETCH_DIR%build

REM Define the fully qualified board name (FQBN)
SET BOARD_FQBN=arduino:avr:uno

REM Create the build directory if it doesn't exist
IF NOT EXIST "%BUILD_DIR%" (
    mkdir "%BUILD_DIR%"
)

echo Sketch file: %SKETCH_FILE%
echo Build directory: %BUILD_DIR%

REM Compile the sketch with the specified build path
arduino-cli compile --fqbn "%BOARD_FQBN%" --build-path "%BUILD_DIR%" "%SKETCH_FILE%" 2> compile_error.log

REM Check if the compilation was successful
IF ERRORLEVEL 1 (
    echo Compilation failed. See compile_error.log for details.
    type compile_error.log
    exit /b 1
)

REM List the compiled files
echo Compiled files are located in: %BUILD_DIR%
dir /b "%BUILD_DIR%"

