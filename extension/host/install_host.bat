@echo off
:: Register the native messaging host
REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\com.firmdev.uploaded_extension" /ve /t REG_SZ /d "%~dp0com.firmdev.uploaded_extension.json" /f
