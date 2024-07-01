@echo off

REM Hardcoded sketch file path
SET SKETCH_FILE=.\sketch\sketch.ino

REM Get the directory containing the sketch file
SET SKETCH_DIR=%~dp0sketch

REM Define the build output directory
SET BUILD_DIR=%SKETCH_DIR%\build

REM Define the fully qualified board name (FQBN)
SET BOARD_FQBN=arduino:avr:uno

REM Create the build directory if it doesn't exist
IF NOT EXIST "%BUILD_DIR%" (
    mkdir "%BUILD_DIR%"
)

echo Sketch file: %SKETCH_FILE%
echo Build directory: %BUILD_DIR%

REM Compile the sketch with the specified build path
arduino-cli compile --fqbn "%BOARD_FQBN%" --build-path "%BUILD_DIR%" "%SKETCH_FILE%"

REM List the compiled files
echo Compiled files are located in: %BUILD_DIR%
dir /b "%BUILD_DIR%"
