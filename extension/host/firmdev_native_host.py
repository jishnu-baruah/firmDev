import struct
import sys
import threading
import queue as Queue
import serial.tools.list_ports
import json
import subprocess
import os

def send_message(message):
    sys.stdout.buffer.write(struct.pack('I', len(message)))
    sys.stdout.buffer.write(message.encode('utf-8'))
    sys.stdout.flush()

def read_thread_func(queue):
    while True:
        text_length_bytes = sys.stdin.buffer.read(4)
        if len(text_length_bytes) == 0:
            if queue:
                queue.put(None)
            sys.exit(0)
        text_length = struct.unpack('@I', text_length_bytes)[0]
        text = sys.stdin.buffer.read(text_length).decode('utf-8')
        if text == '{"text":"exit"}':
            break
        if queue:
            queue.put(text)
        else:
            send_message('{"echo": %s}' % text)

def list_ports():
    ports = serial.tools.list_ports.comports()
    return [port.device for port in ports]

def upload_code(port, code_url):
    # Placeholder function for actual upload logic
    pass

def compile_sketch():
    try:
        sketch_file = ".\\sketch\\sketch.ino"
        sketch_dir = os.path.dirname(os.path.abspath(sketch_file))
        result = subprocess.run(['compile.bat', sketch_file], capture_output=True, text=True, shell=True)
        send_message(json.dumps({
            "status": "compile_finished",
            "returncode": result.returncode,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "sketch_dir": sketch_dir
        }))
    except Exception as e:
        send_message(json.dumps({"status": "compile_exception", "exception": str(e)}))

def Main():
    queue = Queue.Queue()
    thread = threading.Thread(target=read_thread_func, args=(queue,))
    thread.daemon = True
    thread.start()
    while True:
        while not queue.empty():
            message = queue.get_nowait()
            if message is None:
                sys.exit(0)
            message_json = json.loads(message)
            if message_json.get('command') == 'list_ports':
                ports = list_ports()
                send_message(json.dumps({"ports": ports}))
            elif message_json.get('command') == 'upload_code':
                port = message_json.get('port')
                code_url = message_json.get('code_url')
                upload_code(port, code_url)
                send_message('{"status": "upload_started"}')
            elif message_json.get('command') == 'compile_sketch':
                compile_sketch()

if __name__ == '__main__':
    Main()
