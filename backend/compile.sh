#!/bin/bash

# Check if sketch file path is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_sketch_file>"
  exit 1
fi

# Get the absolute path to the sketch file
SKETCH_FILE=$(realpath "$1")

# Get the directory containing the sketch file
SKETCH_DIR=$(dirname "$SKETCH_FILE")

# Define the build output directory
BUILD_DIR="$SKETCH_DIR/build"

# Define the fully qualified board name (FQBN)
BOARD_FQBN="arduino:avr:uno"

# Create the build directory if it doesn't exist
mkdir -p "$BUILD_DIR"

# Compile the sketch with the specified build path
arduino-cli compile --fqbn "$BOARD_FQBN" --build-path "$BUILD_DIR" "$SKETCH_FILE"

# List the compiled files
echo "Compiled files are located in: $BUILD_DIR"
ls -l "$BUILD_DIR"
