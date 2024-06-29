#!/bin/bash

HOST_NAME="com.firmdev.uploaded_extension"
HOST_FILE="$PWD/com.firmdev.uploaded_extension_linux.json"
NATIVE_MESSAGING_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"

mkdir -p "$NATIVE_MESSAGING_DIR"
cp "$HOST_FILE" "$NATIVE_MESSAGING_DIR/$HOST_NAME.json"

echo "Native messaging host $HOST_NAME has been installed."
