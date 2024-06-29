@echo off

REM Check if arguments are provided
if "%~1" == "" (
    echo Error: COM port argument missing.
    exit /b 1
)

if "%~2" == "" (
    echo Error: Hex file location argument missing.
    exit /b 1
)

REM Set variables for Arduino CLI and arguments
set COM_PORT=%~1
set HEX_FILE=%~2
set ARDUINO_CLI=arduino-cli

REM Upload command
%ARDUINO_CLI% upload -p %COM_PORT% --fqbn arduino:avr:uno --input-file %HEX_FILE%

REM Check Arduino CLI exit code
if %errorlevel% neq 0 (
    echo Upload failed.
    exit /b %errorlevel%
)

echo Upload completed successfully.
exit /b 0
