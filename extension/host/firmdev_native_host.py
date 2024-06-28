import struct
import sys
import threading
import queue as Queue
import serial.tools.list_ports
import json

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

if __name__ == '__main__':
    Main()
